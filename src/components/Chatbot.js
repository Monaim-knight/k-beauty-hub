import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, ShoppingCart, Star, Heart, Sparkles, Database, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getProductKnowledgeBase, getKnowledgeBaseStats } from '../utils/productKnowledgeManager';

const Chatbot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [chatState, setChatState] = useState('greeting');
  const [userPreferences, setUserPreferences] = useState({});
  const [knowledgeBaseStats, setKnowledgeBaseStats] = useState({
    totalProducts: 0,
    categories: new Set(),
    trendingProducts: []
  });
  const messagesEndRef = useRef(null);

  // Get the product knowledge base instance
  const productKB = getProductKnowledgeBase();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting with knowledge base info
      setTimeout(() => {
        addBotMessage("안녕하세요! 👋 Welcome to K-Beauty Hub! I'm your AI beauty assistant with knowledge of " + 
          productKB.productData.size + " products.");
        addBotMessage("I can help you with:\n• Smart product recommendations\n• Detailed product information\n• Personalized beauty advice\n• Order placement\n• Beauty tips and routines");
      }, 500);
    }
  }, [isOpen]);

  // Update knowledge base stats
  useEffect(() => {
    const stats = getKnowledgeBaseStats();
    setKnowledgeBaseStats({
      totalProducts: stats.totalProducts,
      categories: new Set(stats.categories),
      trendingProducts: stats.mostQueriedProducts
    });
  }, []);

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

  const getBeautyTips = () => {
    const tips = [
      "💡 **Korean Skincare Routine**: Cleanse → Tone → Essence → Serum → Moisturize → Sunscreen",
      "🌟 **Glass Skin Secret**: Use a hydrating essence like our COSRX Snail Mucin for that dewy glow!",
      "🌸 **Lip Care**: Apply lip balm before bed and wake up with soft, plump lips",
      "✨ **BB Cream Tip**: Apply with a damp beauty sponge for flawless, natural coverage",
      "🌙 **Night Care**: Use a sleeping mask like Laneige Water Sleeping Mask for overnight hydration",
      "☀️ **Sun Protection**: Always apply SPF, even on cloudy days! Korean sunscreens are lightweight and non-greasy"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const getProductRecommendations = (category = null, userPrefs = null) => {
    let recommendations;
    
    if (userPrefs) {
      recommendations = productKB.getPersonalizedRecommendations(userPrefs);
    } else if (category) {
      const categoryProducts = Array.from(productKB.productData.values())
        .filter(p => p.category === category)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      recommendations = categoryProducts;
    } else {
      recommendations = productKB.getTrendingProducts();
    }
    
    if (recommendations.length > 0) {
      const productList = recommendations.map(product => 
        `• ${product.name} - $${product.price} ⭐${product.rating}\n  ${product.benefits.join(', ')}`
      ).join('\n\n');
      
      return `Here are my ${category || 'personalized'} recommendations:\n\n${productList}\n\nWould you like detailed information about any of these products?`;
    } else {
      return "I'm still learning about products in this category. Would you like to browse our full collection?";
    }
  };

  const handleProductSearch = (query) => {
    const results = productKB.searchProducts(query);

    if (results.length > 0) {
      const productList = results.slice(0, 3).map(product => 
        `• ${product.name} - $${product.price} (${product.category}) ⭐${product.rating}\n  Benefits: ${product.benefits.join(', ')}`
      ).join('\n\n');
      
      addBotMessage(`I found ${results.length} products matching "${query}":\n\n${productList}\n\nWould you like detailed information about any of these products?`);
    } else {
      addBotMessage(`I couldn't find any products matching "${query}". Would you like to browse our categories or try a different search term?`);
    }
  };

  const getProductDetails = (productName) => {
    const product = Array.from(productKB.productData.values())
      .find(p => p.name.toLowerCase().includes(productName.toLowerCase()));
    
    if (product) {
      // Update analytics
      productKB.updateAnalytics(product.id);
      
      const details = `**${product.name}**\n\n` +
        `💰 Price: $${product.price} (was $${product.originalPrice})\n` +
        `⭐ Rating: ${product.rating}/5 (${product.reviews} reviews)\n` +
        `📦 Category: ${product.category}\n` +
        `✨ Benefits: ${product.benefits.join(', ')}\n` +
        `🧴 Suitable for: ${product.skinTypes.join(', ')}\n` +
        `🌿 Key ingredients: ${product.ingredients.join(', ')}\n` +
        `📝 Usage: ${product.usage.join(', ')}\n\n` +
        `📖 Description: ${product.description}\n\n` +
        `Would you like to order this product or learn about similar items?`;
      
      addBotMessage(details);
    } else {
      addBotMessage("I couldn't find that specific product. Could you please check the spelling or browse our catalog?");
    }
  };

  const handleOrderProcess = (productName) => {
    const product = Array.from(productKB.productData.values())
      .find(p => p.name.toLowerCase().includes(productName.toLowerCase()));
    
    if (product) {
      setCurrentOrder({
        product: product,
        quantity: 1,
        total: product.price
      });
      
      addBotMessage(`Great choice! I've added "${product.name}" to your cart.\n\nOrder Summary:\n• Product: ${product.name}\n• Price: $${product.price}\n• Quantity: 1\n• Total: $${product.price}\n\nWould you like to:\n1. Confirm this order\n2. Add more items\n3. Modify quantity\n4. Cancel order`);
    } else {
      addBotMessage("I'm sorry, I couldn't find that product. Could you please specify the exact product name or browse our catalog?");
    }
  };

  const handleOrderConfirmation = () => {
    if (currentOrder) {
      addBotMessage(`Perfect! 🎉 Your order has been confirmed!\n\nOrder Details:\n• Product: ${currentOrder.product.name}\n• Quantity: ${currentOrder.quantity}\n• Total: $${currentOrder.total}\n• Order ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}\n\nThank you for choosing K-Beauty Hub! 💖 Your order will be processed and shipped within 1-2 business days. You'll receive a confirmation email shortly.\n\nIs there anything else I can help you with today?`);
      setCurrentOrder(null);
      setChatState('greeting');
    }
  };

  const handleEscalation = () => {
    addBotMessage("I understand you'd like to speak with a human agent. Let me connect you with our beauty experts! 👩‍💼\n\nPlease wait a moment while I transfer you...");
    setTimeout(() => {
      addBotMessage("You're now connected with Sarah, our K-Beauty specialist! She'll be with you shortly. In the meantime, feel free to browse our products or check out our beauty tips.");
    }, 2000);
  };

  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Beauty tips
    if (lowerInput.includes('tip') || lowerInput.includes('advice') || lowerInput.includes('routine')) {
      simulateTyping(() => {
        addBotMessage(getBeautyTips());
      });
      return;
    }

    // Product recommendations
    if (lowerInput.includes('recommend') || lowerInput.includes('suggest') || lowerInput.includes('best')) {
      simulateTyping(() => {
        if (lowerInput.includes('skincare')) {
          addBotMessage(getProductRecommendations('skincare'));
        } else if (lowerInput.includes('makeup')) {
          addBotMessage(getProductRecommendations('makeup'));
        } else if (lowerInput.includes('personalized') || lowerInput.includes('for me')) {
          addBotMessage(getProductRecommendations(null, userPreferences));
        } else {
          addBotMessage(getProductRecommendations());
        }
      });
      return;
    }

    // Product search
    if (lowerInput.includes('product') || lowerInput.includes('find') || lowerInput.includes('search')) {
      simulateTyping(() => handleProductSearch(input));
      return;
    }

    // Product details
    if (lowerInput.includes('tell me about') || lowerInput.includes('what is') || lowerInput.includes('details')) {
      simulateTyping(() => {
        const productName = input.replace(/tell me about|what is|details/gi, '').trim();
        getProductDetails(productName);
      });
      return;
    }

    // Order related
    if (lowerInput.includes('order') || lowerInput.includes('buy') || lowerInput.includes('purchase')) {
      simulateTyping(() => {
        if (currentOrder) {
          if (lowerInput.includes('confirm') || lowerInput.includes('yes')) {
            handleOrderConfirmation();
          } else if (lowerInput.includes('cancel')) {
            setCurrentOrder(null);
            addBotMessage("Order cancelled. How else can I help you today?");
          }
        } else {
          addBotMessage("I'd be happy to help you place an order! What product would you like to purchase?");
        }
      });
      return;
    }

    // Pricing
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('how much')) {
      simulateTyping(() => {
        addBotMessage("Our K-Beauty products range from $6.99 to $45.99. We offer competitive pricing and often have special discounts! Would you like me to show you our current deals or help you find products within a specific price range?");
      });
      return;
    }

    // Shipping
    if (lowerInput.includes('shipping') || lowerInput.includes('delivery') || lowerInput.includes('when')) {
      simulateTyping(() => {
        addBotMessage("🚚 **Shipping Information:**\n\n• Free shipping on orders over $50\n• Standard delivery: 3-5 business days\n• Express delivery: 1-2 business days (+$8.99)\n• International shipping available\n• Track your order with real-time updates\n\nWould you like to place an order or check our shipping rates?");
      });
      return;
    }

    // Return policy
    if (lowerInput.includes('return') || lowerInput.includes('refund') || lowerInput.includes('exchange')) {
      simulateTyping(() => {
        addBotMessage("🔄 **Return Policy:**\n\n• 30-day return window\n• Free returns for unused items\n• Refund processed within 3-5 business days\n• Exchange available for different shades/sizes\n• Contact our support team for assistance\n\nIs there a specific product you'd like to return or exchange?");
      });
      return;
    }

    // Human agent
    if (lowerInput.includes('human') || lowerInput.includes('agent') || lowerInput.includes('speak to someone')) {
      simulateTyping(() => handleEscalation());
      return;
    }

    // Knowledge base stats
    if (lowerInput.includes('how many products') || lowerInput.includes('product count')) {
      simulateTyping(() => {
        addBotMessage(`I currently have knowledge of ${productKB.productData.size} K-Beauty products across ${knowledgeBaseStats.categories.size} categories. I'm constantly learning about new products as they're added to our collection! 📚✨`);
      });
      return;
    }

    // Default response
    simulateTyping(() => {
      addBotMessage("I'm here to help with your K-Beauty journey! You can ask me about:\n\n• Product recommendations and details\n• Beauty tips and routines\n• Ordering and shipping\n• Returns and customer service\n• Or just chat about Korean beauty trends!\n\nWhat would you like to know? 💖");
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

  const quickReplies = [
    "Show me products",
    "Beauty tips",
    "Shipping info",
    "Speak to human",
    "Product recommendations"
  ];

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    processUserInput(reply);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-pink-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">K-Beauty Assistant</h3>
                <p className="text-sm text-pink-100">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-pink-500' 
                      : 'bg-gradient-to-r from-pink-400 to-purple-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-pink-500 text-white'
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
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

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full hover:bg-pink-100 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default Chatbot; 