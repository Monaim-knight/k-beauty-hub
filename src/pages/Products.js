import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const Products = ({ onAddToCart }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('allProducts')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('allProductsDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid 
        products={products} 
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default Products; 