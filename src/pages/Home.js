import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('featuredProductsDesc')}
            </p>
          </div>
          <ProductGrid featuredOnly={true} />
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg px-8 py-3 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              {t('viewAllProducts')}
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <h2 className="text-3xl font-bold text-gray-900">
                {t('shopByCategory')}
              </h2>
              <Sparkles className="h-6 w-6 text-pink-500" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('shopByCategoryDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="text-sm text-pink-600 font-medium bg-pink-100 px-3 py-1 rounded-full">
                      {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg py-3 px-4 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Shop {category.name}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('stayUpdated')}
            </h2>
            <p className="text-lg text-gray-300">
              {t('stayUpdatedDesc')}
            </p>
          </div>
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default Home; 