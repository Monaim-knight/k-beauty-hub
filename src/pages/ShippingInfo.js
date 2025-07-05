import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Clock, MapPin, Globe, Package, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ShippingInfo = () => {
  const navigate = useNavigate();


  const shippingOptions = [
    {
      name: 'Standard Shipping',
      price: '$5.99',
      timeframe: '5-7 business days',
      description: 'Reliable ground shipping across the continental US',
      features: ['Tracking included', 'Signature confirmation available', 'Insurance up to $100'],
      icon: Truck
    },
    {
      name: 'Express Shipping',
      price: '$12.99',
      timeframe: '2-3 business days',
      description: 'Faster delivery for when you need your beauty products sooner',
      features: ['Priority handling', 'Real-time tracking', 'Insurance up to $200', 'Signature confirmation'],
      icon: Clock
    },
    {
      name: 'Overnight Shipping',
      price: '$24.99',
      timeframe: 'Next business day',
      description: 'Ultra-fast delivery for urgent beauty needs',
      features: ['Same-day processing', 'Priority tracking', 'Insurance up to $500', 'Signature required'],
      icon: Package
    }
  ];

  const internationalShipping = [
    {
      region: 'Canada',
      price: '$15.99',
      timeframe: '7-10 business days',
      features: ['Customs handling', 'Tracking included']
    },
    {
      region: 'United Kingdom',
      price: '$19.99',
      timeframe: '8-12 business days',
      features: ['Customs handling', 'Tracking included', 'Duty calculator']
    },
    {
      region: 'Australia',
      price: '$22.99',
      timeframe: '10-15 business days',
      features: ['Customs handling', 'Tracking included', 'Duty calculator']
    },
    {
      region: 'Other International',
      price: '$25.99',
      timeframe: '12-20 business days',
      features: ['Customs handling', 'Tracking included', 'Duty calculator']
    }
  ];

  const shippingFeatures = [
    {
      icon: Shield,
      title: 'Secure Packaging',
      description: 'All products are carefully packaged to prevent damage during transit'
    },
    {
      icon: CheckCircle,
      title: 'Order Tracking',
      description: 'Track your order from warehouse to doorstep with real-time updates'
    },
    {
      icon: Globe,
      title: 'International Shipping',
      description: 'We ship to over 50 countries worldwide with customs handling'
    },
    {
      icon: MapPin,
      title: 'Delivery Notifications',
      description: 'Get email and SMS updates about your delivery status'
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
              <Truck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shipping Information</h1>
              <p className="text-sm text-pink-600 font-medium">Fast, reliable delivery to your door</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer multiple shipping options to meet your needs. All orders are carefully packaged 
            and tracked from our warehouse to your doorstep.
          </p>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 mb-12 text-white">
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="h-8 w-8" />
            <div className="text-center">
              <h2 className="text-2xl font-bold">Free Shipping on Orders Over $50</h2>
              <p className="text-pink-100">Standard shipping is free for qualifying orders</p>
            </div>
          </div>
        </div>

        {/* Domestic Shipping Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Domestic Shipping Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <option.icon className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                    <p className="text-2xl font-bold text-pink-600">{option.price}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{option.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{option.timeframe}</span>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* International Shipping */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">International Shipping</h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {internationalShipping.map((region, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{region.region}</h3>
                  <p className="text-2xl font-bold text-pink-600 mb-2">{region.price}</p>
                  <p className="text-sm text-gray-600 mb-3">{region.timeframe}</p>
                  <ul className="space-y-1">
                    {region.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Shipping?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">Important Shipping Notes</h3>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• Orders are processed within 1-2 business days</li>
                <li>• Delivery times may be extended during holidays and peak seasons</li>
                <li>• International orders may be subject to customs duties and taxes</li>
                <li>• We cannot ship to PO boxes for international orders</li>
                <li>• Signature may be required for orders over $200</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Track Your Order */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Track Your Order</h2>
          <p className="text-gray-600 mb-6">
            Have an order on the way? Enter your tracking number to see real-time updates.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter tracking number..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                Track
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo; 