import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Clock, Package, CheckCircle, AlertCircle, FileText, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ReturnsExchanges = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState('returns');

  const returnPolicy = {
    timeframe: '30 days from delivery',
    condition: 'Unused and in original packaging',
    exclusions: [
      'Personal care items (for hygiene reasons)',
      'Sale or clearance items',
      'Gift cards',
      'Custom or personalized items'
    ]
  };

  const returnProcess = [
    {
      step: 1,
      title: 'Start Your Return',
      description: 'Log into your account and go to your order history to initiate a return',
      icon: FileText
    },
    {
      step: 2,
      title: 'Print Return Label',
      description: 'We\'ll provide a prepaid shipping label for your convenience',
      icon: Package
    },
    {
      step: 3,
      title: 'Ship Your Return',
      description: 'Package your item securely and drop it off at any authorized shipping location',
      icon: Truck
    },
    {
      step: 4,
      title: 'Receive Refund',
      description: 'Once we receive and inspect your return, we\'ll process your refund within 5-7 business days',
      icon: CheckCircle
    }
  ];

  const exchangeProcess = [
    {
      step: 1,
      title: 'Contact Customer Service',
      description: 'Reach out to our customer service team to request an exchange',
      icon: FileText
    },
    {
      step: 2,
      title: 'Return Original Item',
      description: 'Ship back the original item using our prepaid return label',
      icon: Package
    },
    {
      step: 3,
      title: 'Select Replacement',
      description: 'Choose your replacement item or receive a refund',
      icon: RefreshCw
    },
    {
      step: 4,
      title: 'Receive New Item',
      description: 'We\'ll ship your replacement item as soon as we receive your return',
      icon: CheckCircle
    }
  ];

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
              <RefreshCw className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Returns & Exchanges</h1>
              <p className="text-sm text-pink-600 font-medium">Easy returns and exchanges</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We want you to love your K-beauty products. If you're not completely satisfied, 
            we offer easy returns and exchanges within 30 days of delivery.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setSelectedTab('returns')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                selectedTab === 'returns'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Returns
            </button>
            <button
              onClick={() => setSelectedTab('exchanges')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                selectedTab === 'exchanges'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Exchanges
            </button>
          </div>
        </div>

        {/* Return Policy */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Policy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Clock className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <h3 className="font-bold text-gray-900">Timeframe</h3>
              <p className="text-pink-600 font-semibold">{returnPolicy.timeframe}</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-bold text-gray-900">Condition</h3>
              <p className="text-purple-600 font-semibold">{returnPolicy.condition}</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-bold text-gray-900">Free Returns</h3>
              <p className="text-green-600 font-semibold">Prepaid shipping</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">Items Not Eligible for Return</h3>
                <ul className="space-y-1 text-sm text-yellow-700">
                  {returnPolicy.exclusions.map((exclusion, index) => (
                    <li key={index}>• {exclusion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedTab === 'returns' ? 'Return Process' : 'Exchange Process'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(selectedTab === 'returns' ? returnProcess : exchangeProcess).map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  {index < (selectedTab === 'returns' ? returnProcess : exchangeProcess).length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Refund Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Return received: 1-2 business days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Inspection period: 1-2 business days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Refund processed: 3-5 business days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Bank posting: 5-10 business days</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">What You'll Receive</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full refund of item cost</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Original shipping cost (if applicable)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Tax refund (where applicable)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Email confirmation when processed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Your Return?</h2>
          <p className="text-pink-100 mb-6">
            Our customer service team is here to help you with any questions about returns or exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Contact Support
            </button>
            <button
              onClick={() => navigate('/help')}
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-300"
            >
              View Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchanges; 