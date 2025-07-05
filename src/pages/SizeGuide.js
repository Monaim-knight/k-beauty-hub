import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ruler, Eye, Heart, Package, Users, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SizeGuide = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('skincare');

  const categories = [
    { id: 'skincare', name: 'Skincare', icon: Heart },
    { id: 'makeup', name: 'Makeup', icon: Eye },
    { id: 'tools', name: 'Beauty Tools', icon: Package }
  ];

  const sizeCharts = {
    skincare: {
      description: 'Most skincare products come in standard sizes. Here are the common measurements:',
      sizes: [
        { size: 'Travel Size', volume: '15-30ml', description: 'Perfect for travel and sampling' },
        { size: 'Regular Size', volume: '50-100ml', description: 'Standard size for daily use' },
        { size: 'Large Size', volume: '150-200ml', description: 'Great value for frequent use' },
        { size: 'Jumbo Size', volume: '300ml+', description: 'Best value for family or long-term use' }
      ]
    },
    makeup: {
      description: 'Makeup products have various sizing standards. Check the specific product for exact measurements:',
      sizes: [
        { size: 'Foundation', volume: '30ml', description: 'Standard foundation bottle size' },
        { size: 'Concealer', volume: '5-15ml', description: 'Small tube or pot format' },
        { size: 'Lipstick', volume: '3-4g', description: 'Standard lipstick bullet size' },
        { size: 'Eyeshadow', volume: '1-3g', description: 'Single pan or palette format' },
        { size: 'Mascara', volume: '8-12ml', description: 'Standard mascara tube size' }
      ]
    },
    tools: {
      description: 'Beauty tools and accessories come in various sizes. Here are common measurements:',
      sizes: [
        { size: 'Makeup Brushes', length: '15-25cm', description: 'Handle length varies by brush type' },
        { size: 'Beauty Blenders', diameter: '5-7cm', description: 'Standard beauty sponge size' },
        { size: 'Mirrors', size: '10-20cm', description: 'Diameter for handheld mirrors' },
        { size: 'Tweezers', length: '8-12cm', description: 'Standard tweezers length' },
        { size: 'Eyelash Curlers', width: '2-3cm', description: 'Standard eyelash curler width' }
      ]
    }
  };

  const measuringTips = [
    {
      title: 'How to Measure Your Face',
      steps: [
        'Use a flexible measuring tape',
        'Measure from hairline to chin for length',
        'Measure across cheekbones for width',
        'Measure around your head for circumference'
      ]
    },
    {
      title: 'Understanding Product Sizes',
      steps: [
        'Check the product description for exact measurements',
        'Compare with similar products you own',
        'Consider your usage frequency',
        'Read customer reviews for size feedback'
      ]
    },
    {
      title: 'Travel-Friendly Sizes',
      steps: [
        'Look for products under 100ml for carry-on',
        'Choose travel-sized versions when available',
        'Consider multi-purpose products',
        'Check TSA guidelines for liquids'
      ]
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
              <Ruler className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Size Guide</h1>
              <p className="text-sm text-pink-600 font-medium">Find the perfect fit</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Not sure about product sizes? Our comprehensive size guide helps you choose the right 
            products for your needs. From skincare to makeup to beauty tools, we've got you covered.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size Chart */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {categories.find(cat => cat.id === selectedCategory)?.name} Size Chart
          </h2>
          
          <p className="text-gray-600 mb-6">
            {sizeCharts[selectedCategory].description}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Measurement</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody>
                {sizeCharts[selectedCategory].sizes.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.size}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.volume || item.length || item.diameter || item.size}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measuring Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {measuringTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Info className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-bold text-gray-900">{tip.title}</h3>
              </div>
              <ul className="space-y-2">
                {tip.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Size Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Size Comparison Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-pink-600 font-bold text-sm">S</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Small</h3>
              <p className="text-sm text-gray-600">Travel & Sample Sizes</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-sm">M</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Medium</h3>
              <p className="text-sm text-gray-600">Standard Sizes</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-sm">L</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Large</h3>
              <p className="text-sm text-gray-600">Value Sizes</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-28 h-28 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-sm">XL</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Extra Large</h3>
              <p className="text-sm text-gray-600">Jumbo Sizes</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Unsure About Sizes?</h2>
          <p className="text-pink-100 mb-6">
            Our customer service team can help you find the perfect size for your needs.
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

export default SizeGuide; 