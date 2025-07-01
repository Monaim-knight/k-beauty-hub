import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, Users, MessageSquare } from 'lucide-react';
import { getProductKnowledgeBase } from '../utils/productKnowledgeManager';

// Feedback Bot Manager Class
class FeedbackBotManager {
  constructor() {
    this.customers = new Map();
    this.feedbackSessions = new Map();
    this.gdprConsent = new Map();
    this.optOutList = new Set();
    this.feedbackPeriod = 30;
    this.initializeSampleData();
  }

  initializeSampleData() {
    const sampleCustomers = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0123',
        language: 'en',
        purchases: [
          {
            orderId: 'ORD-001',
            date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
            products: [
              { name: 'COSRX Advanced Snail 96 Mucin Power Essence', price: 24.99 }
            ],
            total: 24.99,
            status: 'delivered'
          }
        ],
        gdprConsent: true,
        optOut: false,
        lastContact: null
      }
    ];

    sampleCustomers.forEach(customer => {
      this.customers.set(customer.id, customer);
      if (customer.gdprConsent) {
        this.gdprConsent.set(customer.id, true);
      }
      if (customer.optOut) {
        this.optOutList.add(customer.id);
      }
    });
  }

  getCustomersReadyForFeedback() {
    const readyCustomers = [];
    const now = new Date();

    this.customers.forEach((customer, customerId) => {
      if (this.optOutList.has(customerId)) return;

      customer.purchases.forEach(purchase => {
        const daysSincePurchase = Math.floor((now - purchase.date) / (1000 * 60 * 60 * 24));
        
        if (daysSincePurchase >= this.feedbackPeriod && 
            purchase.status === 'delivered' && 
            !this.hasBeenContacted(customerId, purchase.orderId)) {
          readyCustomers.push({
            customerId,
            customer,
            purchase,
            daysSincePurchase
          });
        }
      });
    });

    return readyCustomers;
  }

  hasBeenContacted(customerId, orderId) {
    const session = this.feedbackSessions.get(`${customerId}-${orderId}`);
    return session && session.contacted;
  }

  startFeedbackSession(customerId, orderId) {
    const sessionKey = `${customerId}-${orderId}`;
    const session = {
      customerId,
      orderId,
      contacted: true,
      contactDate: new Date(),
      responses: [],
      status: 'active',
      rating: null,
      review: null,
      satisfaction: null
    };
    
    this.feedbackSessions.set(sessionKey, session);
    return session;
  }

  getFeedbackSession(customerId, orderId) {
    const sessionKey = `${customerId}-${orderId}`;
    return this.feedbackSessions.get(sessionKey);
  }

  updateFeedbackSession(customerId, orderId, updates) {
    const session = this.getFeedbackSession(customerId, orderId);
    if (session) {
      Object.assign(session, updates);
      session.lastUpdated = new Date();
    }
    return session;
  }

  generateGreetingMessage(customer, purchase, language = 'en') {
    return `Hey ${customer.name}! 👋\n\nWe hope you're enjoying your K-Beauty products! It's been about 30 days since your purchase, and we'd love to hear about your experience.\n\nHow are you liking your ${purchase.products.map(p => p.name).join(' and ')}?`;
  }

  generateFeedbackRequest(language = 'en') {
    return "Would you mind sharing your thoughts?\n\nHow would you rate your experience?\nAny specific comments or suggestions?\n\nIf you're not completely satisfied, we're here to help!";
  }

  generateThankYouMessage(language = 'en') {
    return "Thank you so much for your feedback! 💖 Your input helps us improve and serve you better. We appreciate you being part of our K-Beauty community!";
  }

  getAnalytics() {
    const totalCustomers = this.customers.size;
    const optedOut = this.optOutList.size;
    const activeCustomers = totalCustomers - optedOut;
    const feedbackSessions = Array.from(this.feedbackSessions.values());
    const completedSessions = feedbackSessions.filter(s => s.status === 'completed');
    const responseRate = totalCustomers > 0 ? (completedSessions.length / totalCustomers * 100).toFixed(1) : 0;

    return {
      totalCustomers,
      activeCustomers,
      optedOut,
      feedbackSessions: feedbackSessions.length,
      completedSessions: completedSessions.length,
      responseRate: `${responseRate}%`,
      averageRating: completedSessions.length > 0 
        ? (completedSessions.reduce((sum, s) => sum + (s.rating || 0), 0) / completedSessions.length).toFixed(1)
        : 0
    };
  }
}

const IntegratedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState('customer-service');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customersReadyForFeedback, setCustomersReadyForFeedback] = useState([]);
  
  const messagesEndRef = useRef(null);
  const feedbackBotManager = useRef(new FeedbackBotManager());
  const productKB = getProductKnowledgeBase();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = useCallback(() => {
    if (chatMode === 'customer-service') {
      setTimeout(() => {
        addBotMessage("안녕하세요! 👋 Welcome to K-Beauty Hub! I'm your AI beauty assistant with knowledge of " + 
          productKB.productData.size + " products.");
        addBotMessage("I can help you with:\n• Smart product recommendations\n• Detailed product information\n• Personalized beauty advice\n• Order placement\n• Beauty tips and routines");
      }, 500);
    } else {
      loadCustomersReadyForFeedback();
      setTimeout(() => {
        addBotMessage("🔍 **Feedback Management System**\n\nI'm here to help manage post-purchase customer feedback and satisfaction tracking.");
        addBotMessage("Available customers for feedback: " + customersReadyForFeedback.length);
        if (customersReadyForFeedback.length > 0) {
          addBotMessage("Select a customer to start a feedback session:");
          const customerOptions = customersReadyForFeedback.map(c => ({
            text: `${c.customer.name} (${c.purchase.orderId})`,
            action: () => selectCustomerForFeedback(c)
          }));
          addBotMessage("", customerOptions);
        }
      }, 500);
    }
  }, [chatMode, customersReadyForFeedback.length, productKB.productData.size]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen, messages.length, initializeChat]);

  const loadCustomersReadyForFeedback = () => {
    const readyCustomers = feedbackBotManager.current.getCustomersReadyForFeedback();
    setCustomersReadyForFeedback(readyCustomers);
  };

  const addBotMessage = (text, options = []) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      options
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  // Customer Service Functions
  const getBeautyTips = () => {
    const tips = [
      "💡 **Korean Skincare Routine**: Cleanse → Tone → Essence → Serum → Moisturize → Sunscreen",
      "🌟 **Glass Skin Secret**: Use a hydrating essence like our COSRX Snail Mucin for that dewy glow!",
      "🌸 **Lip Care**: Apply lip balm before bed and wake up with soft, plump lips"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const getProductRecommendations = () => {
    const recommendations = productKB.getTrendingProducts();
    if (recommendations.length > 0) {
      const productList = recommendations.slice(0, 3).map(product => 
        `• ${product.name} - $${product.price} ⭐${product.rating}`
      ).join('\n');
      return `Here are my recommendations:\n\n${productList}\n\nWould you like detailed information about any of these products?`;
    } else {
      return "I'm still learning about products. Would you like to browse our full collection?";
    }
  };

  const handleProductSearch = (query) => {
    const results = productKB.searchProducts(query);
    if (results.length > 0) {
      const productList = results.slice(0, 3).map(product => 
        `• ${product.name} - $${product.price} (${product.category}) ⭐${product.rating}`
      ).join('\n');
      addBotMessage(`I found ${results.length} products matching "${query}":\n\n${productList}`);
    } else {
      addBotMessage(`I couldn't find any products matching "${query}". Would you like to browse our categories?`);
    }
  };

  const handleEscalation = () => {
    addBotMessage("I understand you'd like to speak with a human agent. Let me connect you with our beauty experts! 👩‍💼");
    setTimeout(() => {
      addBotMessage("You're now connected with Sarah, our K-Beauty specialist! She'll be with you shortly.");
    }, 2000);
  };

  // Feedback Bot Functions
  const selectCustomerForFeedback = (customerData) => {
    setSelectedCustomer(customerData);
    const greeting = feedbackBotManager.current.generateGreetingMessage(
      customerData.customer, 
      customerData.purchase, 
      customerData.customer.language
    );
    addBotMessage(greeting);
    addBotMessage(feedbackBotManager.current.generateFeedbackRequest(customerData.customer.language));
  };

  const handleRatingSelection = (rating) => {
    if (selectedCustomer) {
      feedbackBotManager.current.updateFeedbackSession(
        selectedCustomer.customerId,
        selectedCustomer.purchase.orderId,
        { rating, satisfaction: rating >= 4 ? 'satisfied' : 'unsatisfied' }
      );
      addBotMessage(`Thank you for the ${rating}-star rating! ⭐`);
      addBotMessage("Would you like to share any specific comments about your experience?");
    }
  };

  const handleReviewSubmission = (review) => {
    if (selectedCustomer) {
      feedbackBotManager.current.updateFeedbackSession(
        selectedCustomer.customerId,
        selectedCustomer.purchase.orderId,
        { 
          review,
          status: 'completed',
          completedDate: new Date()
        }
      );
      
      const thankYouMsg = feedbackBotManager.current.generateThankYouMessage(selectedCustomer.customer.language);
      addBotMessage(thankYouMsg);
      
      setSelectedCustomer(null);
      loadCustomersReadyForFeedback();
    }
  };

  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (chatMode === 'customer-service') {
      if (lowerInput.includes('tip') || lowerInput.includes('advice')) {
        simulateTyping(() => {
          addBotMessage(getBeautyTips());
        });
        return;
      }

      if (lowerInput.includes('recommend')) {
        simulateTyping(() => {
          addBotMessage(getProductRecommendations());
        });
        return;
      }

      if (lowerInput.includes('search') || lowerInput.includes('find')) {
        const query = input.replace(/search|find/i, '').trim();
        if (query) {
          simulateTyping(() => {
            handleProductSearch(query);
          });
        }
        return;
      }

      if (lowerInput.includes('human') || lowerInput.includes('agent')) {
        simulateTyping(() => {
          handleEscalation();
        });
        return;
      }

      simulateTyping(() => {
        addBotMessage("I'm here to help! You can ask me about:\n• Product recommendations\n• Beauty tips and routines\n• Order placement\n• Product information\n• Or type 'human' to speak with an agent");
      });
    } else {
      if (lowerInput.includes('rating') || lowerInput.includes('rate')) {
        const ratingMatch = lowerInput.match(/(\d+)/);
        if (ratingMatch) {
          const rating = parseInt(ratingMatch[1]);
          if (rating >= 1 && rating <= 5) {
            handleRatingSelection(rating);
            return;
          }
        }
      }

      if (lowerInput.length > 10) {
        handleReviewSubmission(input);
        return;
      }

      addBotMessage("Please provide your rating (1-5 stars) or share your detailed feedback about the product experience.");
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addUserMessage(inputMessage);
      processUserInput(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply) => {
    if (reply.action) {
      reply.action();
    } else {
      addUserMessage(reply.text);
      processUserInput(reply.text);
    }
  };

  const toggleMode = () => {
    setChatMode(prev => prev === 'customer-service' ? 'feedback' : 'customer-service');
    setMessages([]);
    setSelectedCustomer(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot size={20} />
              <span className="font-semibold">
                {chatMode === 'customer-service' ? 'K-Beauty Assistant' : 'Feedback Manager'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMode}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title={`Switch to ${chatMode === 'customer-service' ? 'Feedback' : 'Customer Service'} mode`}
              >
                {chatMode === 'customer-service' ? <Users size={16} /> : <MessageSquare size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  {message.options && message.options.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(option)}
                          className="block w-full text-left p-2 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={chatMode === 'customer-service' ? "Ask me anything about K-beauty..." : "Enter your feedback..."}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegratedChatbot;
