import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, CheckCircle, Heart, Sparkles } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      delay: 0.2
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      delay: 0.4
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description: "30-day money back guarantee",
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
      delay: 0.6
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium">
              🎉 Free Shipping on Orders Over $50! Limited Time Offer
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 overflow-hidden relative min-h-[70vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Sparkles className="h-5 w-5 text-pink-500 animate-pulse" />
                  <span className="text-sm font-medium text-pink-600 uppercase tracking-wide">K-Beauty</span>
                </div>
                
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  <span className="block">Discover Your Natural</span>
                  <span className="block text-pink-600 relative">
                    Beauty Potential
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 transform scale-x-0 animate-pulse"></span>
                  </span>
                </h1>
                
                <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                  Experience the transformative power of Korean beauty with our curated collection of premium skincare and makeup products.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 text-sm px-5 py-2.5 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:from-pink-600 hover:to-purple-700"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Heart className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                  <span>Shop Now</span>
                  <ArrowRight className={`h-3 w-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Link>
                
                <Link
                  to="/about"
                  className="bg-transparent text-pink-600 font-semibold rounded-lg border-2 border-pink-600 hover:bg-pink-600 hover:text-white text-sm px-5 py-2.5 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                >
                  Learn More
                </Link>
              </div>

              {/* Beauty Experts Indicator */}
              <div className="flex items-center space-x-3 p-2 bg-white/50 backdrop-blur-sm rounded-lg border border-pink-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-900">Live Support</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">4.9</span>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-600">Customer Rating</p>
                </div>
              </div>
            </div>

            {/* Right Content - Woman with Brightening Cream */}
            <div className="relative">
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {/* Main Image */}
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=600&fit=crop&crop=face"
                    alt="Beautiful woman with brightening cream"
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  
                  {/* Brightening Cream Product Overlay */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-bounce">
                    <img
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop"
                      alt="Brightening cream"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="text-center mt-1">
                      <p className="text-xs font-medium text-gray-900">Brightening</p>
                      <p className="text-xs text-pink-600">Essence</p>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 animate-pulse">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 left-4 animate-bounce">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 ease-out ${
                        isVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${feature.delay}s` }}
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start space-x-2">
                          <div className={`${feature.bgColor} p-1.5 rounded-lg`}>
                            <feature.icon className={`h-4 w-4 ${feature.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-xs mb-1">{feature.title}</h3>
                            <p className="text-xs text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-4 h-6 border-2 border-pink-400 rounded-full flex justify-center">
              <div className="w-0.5 h-2 bg-pink-400 rounded-full mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular Korean beauty essentials</p>
          </div>
          
          <ProductGrid limit={8} />
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose K-Beauty Hub?</h2>
            <p className="text-xl text-gray-600">Premium Korean beauty products at your fingertips</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Authentic Korean beauty products from trusted brands</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Advice</h3>
              <p className="text-gray-600">Get personalized recommendations for your skin type</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 