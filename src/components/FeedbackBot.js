import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Star, Heart, Clock, CheckCircle, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Feedback Bot Class - Manages post-purchase customer outreach
class FeedbackBotManager {
  constructor() {
    this.customers = new Map();
    this.feedbackSessions = new Map();
    this.gdprConsent = new Map();
    this.optOutList = new Set();
    this.feedbackPeriod = 30; // days after purchase
    this.initializeSampleData();
  }

  // Initialize with sample customer data
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
            date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
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
      },
      {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+1-555-0456',
        language: 'es',
        purchases: [
          {
            orderId: 'ORD-002',
            date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
            products: [
              { name: 'Laneige Water Sleeping Mask', price: 29.99 },
              { name: 'Etude House Dear Darling Water Gel Tint', price: 8.99 }
            ],
            total: 38.98,
            status: 'delivered'
          }
        ],
        gdprConsent: true,
        optOut: false,
        lastContact: null
      },
      {
        id: 3,
        name: 'Sophie Martin',
        email: 'sophie.martin@email.com',
        phone: '+1-555-0789',
        language: 'fr',
        purchases: [
          {
            orderId: 'ORD-003',
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
            products: [
              { name: 'Innisfree Green Tea Seed Serum', price: 19.99 }
            ],
            total: 19.99,
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

  // Get customers ready for feedback (30+ days after purchase)
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

  // Check if customer has been contacted for this purchase
  hasBeenContacted(customerId, orderId) {
    const session = this.feedbackSessions.get(`${customerId}-${orderId}`);
    return session && session.contacted;
  }

  // Start feedback session
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

  // Get feedback session
  getFeedbackSession(customerId, orderId) {
    const sessionKey = `${customerId}-${orderId}`;
    return this.feedbackSessions.get(sessionKey);
  }

  // Update feedback session
  updateFeedbackSession(customerId, orderId, updates) {
    const session = this.getFeedbackSession(customerId, orderId);
    if (session) {
      Object.assign(session, updates);
      session.lastUpdated = new Date();
    }
    return session;
  }

  // Generate personalized greeting message
  generateGreetingMessage(customer, purchase, language = 'en') {
    const messages = {
      en: {
        greeting: `Hey ${customer.name}! 👋`,
        question: `How are you liking your ${purchase.products.map(p => p.name).join(' and ')}?`,
        intro: "We hope you're enjoying your K-Beauty products! It's been about 30 days since your purchase, and we'd love to hear about your experience."
      },
      es: {
        greeting: `¡Hola ${customer.name}! 👋`,
        question: `¿Cómo te está gustando tu ${purchase.products.map(p => p.name).join(' y ')}?`,
        intro: "¡Esperamos que estés disfrutando de tus productos K-Beauty! Han pasado unos 30 días desde tu compra, y nos encantaría conocer tu experiencia."
      },
      fr: {
        greeting: `Salut ${customer.name}! 👋`,
        question: `Comment trouvez-vous votre ${purchase.products.map(p => p.name).join(' et ')}?`,
        intro: "Nous espérons que vous appréciez vos produits K-Beauty ! Cela fait environ 30 jours depuis votre achat, et nous aimerions connaître votre expérience."
      },
      bn: {
        greeting: `হ্যালো ${customer.name}! 👋`,
        question: `আপনার ${purchase.products.map(p => p.name).join(' এবং ')} কেমন লাগছে?`,
        intro: "আমরা আশা করি আপনি আপনার কে-বিউটি পণ্যগুলি উপভোগ করছেন! আপনার কেনার পর প্রায় ৩০ দিন হয়ে গেছে, এবং আমরা আপনার অভিজ্ঞতা শুনতে চাই।"
      }
    };

    const msg = messages[language] || messages.en;
    return `${msg.greeting}\n\n${msg.intro}\n\n${msg.question}`;
  }

  // Generate feedback request message
  generateFeedbackRequest(language = 'en') {
    const messages = {
      en: {
        request: "Would you mind sharing your thoughts?",
        rating: "How would you rate your experience?",
        review: "Any specific comments or suggestions?",
        support: "If you're not completely satisfied, we're here to help!"
      },
      es: {
        request: "¿Te importaría compartir tus pensamientos?",
        rating: "¿Cómo calificarías tu experiencia?",
        review: "¿Algún comentario o sugerencia específica?",
        support: "¡Si no estás completamente satisfecho, estamos aquí para ayudar!"
      },
      fr: {
        request: "Pourriez-vous partager vos impressions ?",
        rating: "Comment évalueriez-vous votre expérience ?",
        review: "Des commentaires ou suggestions spécifiques ?",
        support: "Si vous n'êtes pas entièrement satisfait, nous sommes là pour vous aider !"
      },
      bn: {
        request: "আপনার মতামত শেয়ার করতে কি আপত্তি আছে?",
        rating: "আপনার অভিজ্ঞতা কেমন ছিল?",
        review: "কোন নির্দিষ্ট মন্তব্য বা পরামর্শ?",
        support: "যদি আপনি সম্পূর্ণ সন্তুষ্ট না হন, আমরা সাহায্যের জন্য এখানে আছি!"
      }
    };

    return messages[language] || messages.en;
  }

  // Generate thank you message
  generateThankYouMessage(language = 'en') {
    const messages = {
      en: "Thank you so much for your feedback! 💖 Your opinion helps us improve and helps other customers make informed decisions. We truly value your input!",
      es: "¡Muchas gracias por tus comentarios! 💖 Tu opinión nos ayuda a mejorar y ayuda a otros clientes a tomar decisiones informadas. ¡Realmente valoramos tu aporte!",
      fr: "Merci beaucoup pour vos commentaires ! 💖 Votre avis nous aide à nous améliorer et aide d'autres clients à prendre des décisions éclairées. Nous apprécions vraiment votre contribution !",
      bn: "আপনার মতামতের জন্য অনেক ধন্যবাদ! 💖 আপনার মতামত আমাদের উন্নত করতে সাহায্য করে এবং অন্যান্য গ্রাহকদের সচেতন সিদ্ধান্ত নিতে সাহায্য করে। আমরা সত্যিই আপনার মতামত মূল্যবান করি!"
    };

    return messages[language] || messages.en;
  }

  // Handle customer opt-out
  handleOptOut(customerId, reason = '') {
    this.optOutList.add(customerId);
    const customer = this.customers.get(customerId);
    if (customer) {
      customer.optOut = true;
      customer.optOutReason = reason;
      customer.optOutDate = new Date();
    }
  }

  // Get GDPR consent status
  getGDPRConsent(customerId) {
    return this.gdprConsent.get(customerId) || false;
  }

  // Update GDPR consent
  updateGDPRConsent(customerId, consent) {
    this.gdprConsent.set(customerId, consent);
    const customer = this.customers.get(customerId);
    if (customer) {
      customer.gdprConsent = consent;
      customer.gdprConsentDate = new Date();
    }
  }

  // Get analytics
  getAnalytics() {
    const totalCustomers = this.customers.size;
    const optedOut = this.optOutList.size;
    const gdprConsented = this.gdprConsent.size;
    const activeSessions = Array.from(this.feedbackSessions.values()).filter(s => s.status === 'active').length;
    const completedSessions = Array.from(this.feedbackSessions.values()).filter(s => s.status === 'completed').length;

    return {
      totalCustomers,
      optedOut,
      gdprConsented,
      activeSessions,
      completedSessions,
      responseRate: totalCustomers > 0 ? (completedSessions / totalCustomers * 100).toFixed(1) : 0
    };
  }
}

// Global feedback bot manager instance
const feedbackBotManager = new FeedbackBotManager();

const FeedbackBot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [customersReady, setCustomersReady] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      loadCustomersReadyForFeedback();
      loadAnalytics();
    }
  }, [isOpen]);

  const loadCustomersReadyForFeedback = () => {
    const ready = feedbackBotManager.getCustomersReadyForFeedback();
    setCustomersReady(ready);
  };

  const loadAnalytics = () => {
    const stats = feedbackBotManager.getAnalytics();
    setAnalytics(stats);
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

  const startFeedbackSession = (customerData) => {
    const { customerId, customer, purchase } = customerData;
    
    // Start session
    const session = feedbackBotManager.startFeedbackSession(customerId, purchase.orderId);
    setCurrentSession(session);

    // Generate greeting message
    const greeting = feedbackBotManager.generateGreetingMessage(customer, purchase, customer.language);
    const feedbackRequest = feedbackBotManager.generateFeedbackRequest(customer.language);

    addBotMessage(greeting);
    addBotMessage(feedbackRequest.request, [
      "⭐ 5 - Excellent",
      "⭐ 4 - Very Good", 
      "⭐ 3 - Good",
      "⭐ 2 - Fair",
      "⭐ 1 - Poor"
    ]);
  };

  const handleRatingSelection = (rating) => {
    if (!currentSession) return;

    const ratingValue = parseInt(rating.split(' ')[0]);
    feedbackBotManager.updateFeedbackSession(
      currentSession.customerId, 
      currentSession.orderId, 
      { rating: ratingValue }
    );

    addUserMessage(`Rating: ${rating}`);
    
    simulateTyping(() => {
      if (ratingValue >= 4) {
        addBotMessage("That's wonderful! 🌟 We're so glad you're happy with your purchase. Would you like to leave a detailed review to help other customers?");
      } else if (ratingValue >= 3) {
        addBotMessage("Thank you for your feedback! We're always working to improve. Is there anything specific we could have done better?");
      } else {
        addBotMessage("We're sorry to hear that! 😔 Please let us know what went wrong so we can make it right. Our customer support team is ready to help.");
      }
    });
  };

  const handleReviewSubmission = (review) => {
    if (!currentSession) return;

    feedbackBotManager.updateFeedbackSession(
      currentSession.customerId, 
      currentSession.orderId, 
      { review, status: 'completed' }
    );

    addUserMessage(`Review: ${review}`);
    
    simulateTyping(() => {
      const thankYou = feedbackBotManager.generateThankYouMessage(currentSession.customer.language);
      addBotMessage(thankYou);
      
      // End session
      setTimeout(() => {
        setCurrentSession(null);
        addBotMessage("Is there anything else I can help you with today?");
      }, 2000);
    });
  };

  const handleSupportRequest = () => {
    addBotMessage("I'm connecting you with our customer support team right now! 👩‍💼\n\nPlease wait a moment while I transfer you...");
    
    setTimeout(() => {
      addBotMessage("You're now connected with Lisa, our K-Beauty specialist! She'll help resolve any issues you're experiencing. Thank you for your patience! 💖");
    }, 2000);
  };

  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Handle rating selection
    if (lowerInput.includes('⭐') || lowerInput.includes('rating') || lowerInput.includes('star')) {
      const ratingMatch = input.match(/(\d+)/);
      if (ratingMatch) {
        handleRatingSelection(ratingMatch[1]);
      }
      return;
    }

    // Handle review submission
    if (lowerInput.includes('review') || lowerInput.includes('comment') || lowerInput.includes('feedback')) {
      handleReviewSubmission(input);
      return;
    }

    // Handle support request
    if (lowerInput.includes('help') || lowerInput.includes('support') || lowerInput.includes('issue') || lowerInput.includes('problem')) {
      handleSupportRequest();
      return;
    }

    // Handle opt-out
    if (lowerInput.includes('opt out') || lowerInput.includes('unsubscribe') || lowerInput.includes('stop')) {
      if (currentSession) {
        feedbackBotManager.handleOptOut(currentSession.customerId, 'User requested opt-out');
        addBotMessage("I understand. You've been removed from our feedback program. You won't receive any more feedback requests. Thank you for your time!");
      }
      return;
    }

    // Default response
    simulateTyping(() => {
      addBotMessage("I'm here to help with your feedback! You can:\n\n• Rate your experience (1-5 stars)\n• Leave a detailed review\n• Request customer support\n• Opt out of future feedback requests\n\nWhat would you like to do?");
    });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addUserMessage(inputMessage);
      processUserInput(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    processUserInput(reply);
  };

  return (
    <>
      {/* Feedback Bot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Feedback Bot Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-green-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Customer Feedback Bot</h3>
                <p className="text-sm text-green-100">
                  {customersReady.length} customers ready for feedback
                </p>
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          {analytics && (
            <div className="bg-gray-50 p-3 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <p className="font-semibold text-gray-800">{analytics.totalCustomers}</p>
                  <p className="text-gray-600">Total Customers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">{analytics.responseRate}%</p>
                  <p className="text-gray-600">Response Rate</p>
                </div>
              </div>
            </div>
          )}

          {/* Customer List / Messages */}
          <div className="h-[400px] overflow-y-auto">
            {!currentSession ? (
              // Customer List
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Customers Ready for Feedback</h4>
                {customersReady.length === 0 ? (
                  <p className="text-gray-500 text-sm">No customers ready for feedback at the moment.</p>
                ) : (
                  <div className="space-y-3">
                    {customersReady.slice(0, 5).map((customerData, index) => (
                      <div 
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-green-300 transition-colors"
                        onClick={() => startFeedbackSession(customerData)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800">{customerData.customer.name}</h5>
                          <span className="text-xs text-gray-500">
                            {customerData.daysSincePurchase} days ago
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {customerData.purchase.products.map(p => p.name).join(', ')}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {customerData.customer.language.toUpperCase()}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            GDPR: {feedbackBotManager.getGDPRConsent(customerData.customerId) ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Chat Messages
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-green-400 to-blue-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        {message.options && message.options.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickReply(option)}
                                className="block w-full text-left text-xs bg-white/20 rounded px-2 py-1 hover:bg-white/30 transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentSession ? "Type your feedback..." : "Select a customer to start..."}
                disabled={!currentSession}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || !currentSession}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-2 rounded-full hover:from-green-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackBot; 