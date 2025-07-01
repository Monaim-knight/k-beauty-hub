import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Award, Globe, Heart, Star, CheckCircle } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const offices = [
    {
      country: 'Bangladesh',
      city: 'Dhaka',
      address: 'Gulshan-2, Dhaka 1212',
      phone: '+880 2-988-1234',
      email: 'bangladesh@kbeautyhub.com',
      flag: '🇧🇩'
    },
    {
      country: 'Germany',
      city: 'Berlin',
      address: 'Mitte District, Berlin 10115',
      phone: '+49 30-123-4567',
      email: 'germany@kbeautyhub.com',
      flag: '🇩🇪'
    },
    {
      country: 'South Korea',
      city: 'Seoul',
      address: 'Gangnam-gu, Seoul 06123',
      phone: '+82 2-1234-5678',
      email: 'korea@kbeautyhub.com',
      flag: '🇰🇷'
    }
  ];

  const stats = [
    { icon: Calendar, label: 'Years of Excellence', value: '4+', description: 'Since 2020' },
    { icon: Users, label: 'Happy Customers', value: '50K+', description: 'Worldwide' },
    { icon: Award, label: 'Products', value: '500+', description: 'Authentic K-Beauty' },
    { icon: Globe, label: 'Countries Served', value: '25+', description: 'Global Reach' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Authenticity',
      description: 'We source only genuine Korean beauty products directly from manufacturers and authorized distributors.'
    },
    {
      icon: Star,
      title: 'Quality',
      description: 'Every product in our collection meets the highest standards of Korean beauty excellence.'
    },
    {
      icon: CheckCircle,
      title: 'Trust',
      description: 'Building lasting relationships with our customers through transparency and reliability.'
    }
  ];

  const handleExploreProducts = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About K-Beauty Hub
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
            Bringing authentic Korean beauty to the world since 2020
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Founded in 2020, K-Beauty Hub was born from a passion for authentic Korean beauty products and a vision to make them accessible to beauty enthusiasts worldwide.
                </p>
                <p>
                  What started as a small family business has grown into a global enterprise with offices in Bangladesh, Germany, and South Korea, serving customers across 25+ countries.
                </p>
                <p>
                  We believe that everyone deserves access to the innovative, high-quality beauty products that have made Korean beauty a global phenomenon.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg">
                  To bridge the gap between Korean beauty innovation and global beauty enthusiasts by providing authentic, high-quality products with exceptional customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offices Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Global Offices
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{office.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{office.country}</h3>
                    <p className="text-gray-600">{office.city}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-pink-500 mr-3">📞</span>
                    <p className="text-gray-700">{office.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-pink-500 mr-3">✉️</span>
                    <p className="text-gray-700">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Beauty Journey
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Discover authentic Korean beauty products and experience the innovation that's taking the world by storm.
          </p>
          <button 
            onClick={handleExploreProducts}
            className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
          >
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
