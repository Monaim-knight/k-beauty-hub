import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQ = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [openQuestions, setOpenQuestions] = useState(new Set());

  const faqCategories = [
    {
      title: 'Ordering & Payment',
      icon: '💳',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. We accept all major credit cards, PayPal, and Apple Pay.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept Visa, MasterCard, American Express, Discover, PayPal, and Apple Pay. All payments are processed securely through our encrypted payment system.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers.'
        },
        {
          question: 'Do you offer gift cards?',
          answer: 'Yes, we offer digital gift cards that can be used for any purchase on our website. Gift cards are delivered via email and never expire.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: '🚚',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and overnight shipping delivers the next business day. International shipping times vary by location.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by location. Customs duties may apply.'
        },
        {
          question: 'How can I track my order?',
          answer: 'You can track your order by logging into your account and viewing your order history, or by using the tracking number provided in your shipping confirmation email.'
        },
        {
          question: 'What if my package is damaged?',
          answer: 'If your package arrives damaged, please take photos and contact our customer service team immediately. We\'ll arrange a replacement or refund.'
        }
      ]
    },
    {
      title: 'Returns & Exchanges',
      icon: '🔄',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unused items in original packaging. Returns are free with our prepaid shipping labels. Some items are not eligible for return.'
        },
        {
          question: 'How do I start a return?',
          answer: 'To start a return, log into your account, go to your order history, and click "Start Return" for the order you want to return. We\'ll provide a prepaid shipping label.'
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'Once we receive your return, we process refunds within 5-7 business days. The refund will appear in your account within 5-10 business days, depending on your bank.'
        },
        {
          question: 'Can I exchange an item instead of returning it?',
          answer: 'Yes, you can request an exchange through our customer service team. We\'ll help you find a suitable replacement for your item.'
        }
      ]
    },
    {
      title: 'Products & Authenticity',
      icon: '✨',
      questions: [
        {
          question: 'Are your products authentic?',
          answer: 'Yes, all our products are 100% authentic and sourced directly from authorized distributors and manufacturers. We guarantee the authenticity of every item.'
        },
        {
          question: 'How do I know if a product is right for my skin type?',
          answer: 'Each product page includes detailed information about skin type compatibility. You can also use our skin type quiz or contact our beauty experts for personalized recommendations.'
        },
        {
          question: 'What is the shelf life of your products?',
          answer: 'Most products have a shelf life of 12-36 months when unopened. Once opened, products typically last 6-12 months. Check the packaging for specific expiration dates.'
        },
        {
          question: 'Do you carry cruelty-free products?',
          answer: 'Yes, we carry many cruelty-free and vegan products. You can filter products by these attributes on our website.'
        }
      ]
    },
    {
      title: 'Account & Security',
      icon: '🔒',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking "Sign Up" in the header and filling out the registration form. You can also create an account during checkout.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a link to reset your password.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log into your account and go to "Account Settings" to update your personal information, shipping addresses, and payment methods.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we protect your personal information with industry-standard security measures. We never share your information with third parties without your consent.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(key)) {
      newOpenQuestions.delete(key);
    } else {
      newOpenQuestions.add(key);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-pink-600 hover:text-pink-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <HelpCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
              <p className="text-sm text-pink-600 font-medium">Find answers to common questions</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Can't find what you're looking for? Search our FAQ or contact our customer service team 
            for personalized assistance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-lg"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openQuestions.has(key);
                  
                  return (
                    <div key={questionIndex} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-semibold text-gray-900">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchTerm && filteredCategories.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any FAQ entries matching "{searchTerm}". Try a different search term or contact our support team.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-pink-100 mb-6">
            Our customer service team is here to help you with any questions not covered in our FAQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contact Support</span>
            </button>
            <button
              onClick={() => navigate('/help')}
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help Center</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 