import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';

const ProductGrid = ({ featuredOnly = false, categoryFilter = null }) => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  // Filter products based on props
  let filteredProducts = products;
  
  if (featuredOnly) {
    filteredProducts = products.filter(product => product.isFeatured);
  }
  
  if (categoryFilter) {
    filteredProducts = products.filter(product => product.category === categoryFilter);
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return featuredOnly ? 0 : (b.isFeatured ? 1 : -1);
    }
  });

  return (
    <div className="w-full">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="featured">{featuredOnly ? 'Featured' : 'Featured First'}</option>
            <option value="name">{t('sortByName')}</option>
            <option value="price-low">{t('sortByPriceLow')}</option>
            <option value="price-high">{t('sortByPriceHigh')}</option>
            <option value="rating">{t('sortByRating')}</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-pink-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-pink-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Products Count */}
      <div className="text-sm text-gray-600 mb-6">
        {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'
            : 'space-y-4 w-full'
        }>
          {sortedProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard
                product={product}
                viewMode={viewMode}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🧴</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('noProductsFound')}
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or browse our other categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 