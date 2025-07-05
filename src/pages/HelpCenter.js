import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, HelpCircle, Package, CreditCard, Truck, RefreshCw, Shield, User, Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HelpCenter = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const helpCategories = [
    {
      title: 'Ordering & Payment',
      icon: CreditCard,
      description: 'Help with placing orders and payment methods',
      articles: [
        'How to place an order',
        'Accepted payment methods',
        'Order confirmation and tracking',
        'Payment security',
        'Gift cards and promotions'
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: Truck,
      description: 'Information about shipping options and delivery',
      articles: [
        'Shipping options and costs',
        'Delivery timeframes',
        'International shipping',
        'Package tracking',
        'Delivery issues'
      ]
    },
    {
      title: 'Returns & Exchanges',
      icon: RefreshCw,
      description: 'How to return or exchange items',
      articles: [
        'Return policy',
        'How to start a return',
        'Exchange process',
        'Refund timeline',
        'Damaged items'
      ]
    },
    {
      title: 'Product Information',
      icon: Package,
      description: 'Details about our products and ingredients',
      articles: [
        'Product ingredients',
        'Skin type recommendations',
        'How to use products',
        'Product expiration',
        'Authenticity guarantee'
      ]
    },
    {
      title: 'Account & Security',
      icon: Shield,
      description: 'Managing your account and security',
      articles: [
        'Creating an account',
        'Password reset',
        'Account security',
        'Privacy settings',
        'Data protection'
      ]
    },
    {
      title: 'Customer Service',
      icon: MessageCircle,
      description: 'How to get help and contact us',
      articles: [
        'Contact methods',
        'Live chat support',
        'Response times',
        'Escalation process',
        'Feedback and reviews'
      ]
    }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article => 
      article.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
              <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
              <p className="text-sm text-pink-600 font-medium">Find answers to your questions</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Need help with your order, products, or account? Browse our help categories below 
            or search for specific topics to find the answers you need.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-lg"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{category.description}</p>
              
              <div className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <button
                    key={articleIndex}
                    className="block w-full text-left text-sm text-gray-700 hover:text-pink-600 transition-colors duration-200 py-1"
                  >
                    • {article}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Still Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/contact')}
              className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="h-8 w-8" />
              <span className="font-semibold">Contact Us</span>
              <span className="text-sm text-pink-100">Get in touch with our team</span>
            </button>

            <button
              onClick={() => navigate('/faq')}
              className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              <HelpCircle className="h-8 w-8" />
              <span className="font-semibold">View FAQ</span>
              <span className="text-sm text-purple-100">Frequently asked questions</span>
            </button>

            <button
              onClick={() => navigate('/shipping')}
              className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <Truck className="h-8 w-8" />
              <span className="font-semibold">Shipping Info</span>
              <span className="text-sm text-blue-100">Learn about shipping options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter; 