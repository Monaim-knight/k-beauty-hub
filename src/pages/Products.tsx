import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const Products: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-lg text-gray-600">
            Browse our complete collection of quality products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} />
    </div>
  );
};

export default Products; 