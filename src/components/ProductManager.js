import React, { useState, useEffect } from 'react';
import { Plus, Database, TrendingUp, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { 
  addNewProductToKnowledgeBase, 
  addMultipleProductsToKnowledgeBase,
  getKnowledgeBaseStats,
  syncKnowledgeBaseWithProducts 
} from '../utils/productKnowledgeManager';

const ProductManager = () => {
  const [stats, setStats] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    originalPrice: '',
    category: 'skincare',
    rating: '',
    reviews: '',
    description: '',
    inStock: true,
    isNew: false,
    isFeatured: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    updateStats();
  }, []);

  const updateStats = () => {
    const currentStats = getKnowledgeBaseStats();
    setStats(currentStats);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddProduct = () => {
    try {
      // Validate required fields
      if (!newProduct.name || !newProduct.price || !newProduct.description) {
        setMessage({ type: 'error', text: 'Please fill in all required fields' });
        return;
      }

      // Generate ID if not provided
      const productToAdd = {
        ...newProduct,
        id: newProduct.id || Date.now(),
        price: parseFloat(newProduct.price),
        originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
        rating: parseFloat(newProduct.rating) || 4.0,
        reviews: parseInt(newProduct.reviews) || 0
      };

      // Add to knowledge base
      const addedProduct = addNewProductToKnowledgeBase(productToAdd);
      
      setMessage({ 
        type: 'success', 
        text: `Product "${addedProduct.name}" successfully added to chatbot knowledge base!` 
      });

      // Reset form
      setNewProduct({
        id: '',
        name: '',
        price: '',
        originalPrice: '',
        category: 'skincare',
        rating: '',
        reviews: '',
        description: '',
        inStock: true,
        isNew: false,
        isFeatured: false
      });

      // Update stats
      updateStats();

    } catch (error) {
      setMessage({ type: 'error', text: `Error adding product: ${error.message}` });
    }
  };

  const handleAddSampleProducts = () => {
    const sampleProducts = [
      {
        id: Date.now() + 1,
        name: 'Dr. Jart+ Cicapair Tiger Grass Color Correcting Treatment',
        price: 34.99,
        originalPrice: 44.99,
        category: 'skincare',
        rating: 4.8,
        reviews: 2156,
        description: 'Color-correcting treatment with Centella Asiatica to soothe and neutralize redness. Provides natural coverage while treating sensitive skin.',
        inStock: true,
        isNew: true,
        isFeatured: true
      },
      {
        id: Date.now() + 2,
        name: 'Glow Recipe Watermelon Glow Niacinamide Dew Drops',
        price: 39.99,
        originalPrice: 49.99,
        category: 'skincare',
        rating: 4.7,
        reviews: 1892,
        description: 'Niacinamide serum with watermelon extract for brightening and pore-refining. Lightweight formula that leaves skin dewy and glowing.',
        inStock: true,
        isNew: true,
        isFeatured: false
      },
      {
        id: Date.now() + 3,
        name: '3CE Velvet Lip Tint',
        price: 16.99,
        originalPrice: 21.99,
        category: 'makeup',
        rating: 4.6,
        reviews: 1247,
        description: 'Velvety matte lip tint with long-lasting color. Non-drying formula with rich pigmentation and comfortable wear.',
        inStock: true,
        isNew: false,
        isFeatured: true
      }
    ];

    try {
      addMultipleProductsToKnowledgeBase(sampleProducts);
      setMessage({ 
        type: 'success', 
        text: `${sampleProducts.length} sample products added to chatbot knowledge base!` 
      });
      updateStats();
    } catch (error) {
      setMessage({ type: 'error', text: `Error adding sample products: ${error.message}` });
    }
  };

  const handleSyncKnowledgeBase = () => {
    try {
      const newStats = syncKnowledgeBaseWithProducts();
      setMessage({ 
        type: 'success', 
        text: `Knowledge base synced! Now contains ${newStats.totalProducts} products across ${newStats.categories.length} categories.` 
      });
      updateStats();
    } catch (error) {
      setMessage({ type: 'error', text: `Error syncing knowledge base: ${error.message}` });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <Database className="h-8 w-8 text-purple-600 mr-3" />
          Product Knowledge Manager
        </h2>
        <p className="text-gray-600">
          Automatically add new products to the chatbot's knowledge base. The AI will learn about new products and provide better assistance to customers.
        </p>
      </div>

      {/* Knowledge Base Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
            <div className="flex items-center">
              <Database className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">Categories</p>
                <p className="text-2xl font-bold">{stats.categories.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">Total Queries</p>
                <p className="text-2xl font-bold">{stats.totalQueries}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-lg">
            <div className="flex items-center">
              <Star className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-90">Most Popular</p>
                <p className="text-lg font-bold">
                  {stats.mostQueriedProducts.length > 0 ? stats.mostQueriedProducts[0]?.name?.split(' ')[0] : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Display */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          {message.text}
        </div>
      )}

      {/* Add New Product Form */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-green-600" />
          Add New Product to Knowledge Base
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., COSRX Advanced Snail 96 Mucin Power Essence"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="skincare">Skincare</option>
              <option value="makeup">Makeup</option>
              <option value="haircare">Haircare</option>
              <option value="bodycare">Bodycare</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="24.99"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
            <input
              type="number"
              name="originalPrice"
              value={newProduct.originalPrice}
              onChange={handleInputChange}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="32.99"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={newProduct.rating}
              onChange={handleInputChange}
              step="0.1"
              min="1"
              max="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="4.8"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Reviews</label>
            <input
              type="number"
              name="reviews"
              value={newProduct.reviews}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="1247"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Detailed product description including benefits, ingredients, and usage..."
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={newProduct.inStock}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isNew"
              checked={newProduct.isNew}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">New Product</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={newProduct.isFeatured}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Featured Product</span>
          </label>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleAddProduct}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product to Knowledge Base
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleAddSampleProducts}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
        >
          <Database className="h-5 w-5 mr-2" />
          Add Sample Products
        </button>
        
        <button
          onClick={handleSyncKnowledgeBase}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          Sync Knowledge Base
        </button>
      </div>

      {/* Information Panel */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">How It Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
          <div>
            <h5 className="font-semibold mb-2">1. Automatic Learning</h5>
            <p>When you add a new product, the chatbot automatically extracts keywords, benefits, ingredients, and usage information.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">2. Smart Recommendations</h5>
            <p>The AI uses this information to provide personalized product recommendations and detailed answers to customer questions.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">3. Analytics Tracking</h5>
            <p>The system tracks which products customers ask about most, helping you understand popular items and trends.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager; 