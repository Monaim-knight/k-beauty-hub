import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Image as ImageIcon,
  Package,
  DollarSign,
  Tag,
  AlertTriangle,
  CheckCircle,
  Eye,
  Upload,
  Star,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import authManager from '../utils/authManager';
import activityLogger from '../utils/activityLogger';
import { products } from '../data/products';

const ProductManagement = () => {
  const [productList, setProductList] = useState([...products]);
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'skincare',
    brand: '',
    stock: '',
    images: [],
    video: '',
    isNew: false,
    inStock: true
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    filterProducts();
  }, [productList, searchTerm, categoryFilter, stockFilter]);

  const filterProducts = () => {
    let filtered = [...productList];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Filter by stock status
    if (stockFilter === 'inStock') {
      filtered = filtered.filter(product => product.inStock);
    } else if (stockFilter === 'outOfStock') {
      filtered = filtered.filter(product => !product.inStock);
    } else if (stockFilter === 'lowStock') {
      filtered = filtered.filter(product => product.inStock && product.stock < 10);
    }

    setFilteredProducts(filtered);
  };

  const handleCreateProduct = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'skincare',
      brand: '',
      stock: '',
      images: [],
      video: '',
      isNew: false,
      inStock: true
    });
    setErrors({});
    setImagePreviews([]);
    setVideoPreview('');
    setVideoFile(null);
    setShowCreateModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand,
      stock: product.stock.toString(),
      images: product.images,
      video: product.video || '',
      isNew: product.isNew,
      inStock: product.inStock
    });
    setImagePreviews(product.images);
    setVideoPreview(product.video || '');
    setVideoFile(null);
    setErrors({});
    setShowEditModal(true);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      const updatedProducts = productList.filter(p => p.id !== product.id);
      setProductList(updatedProducts);
      
      activityLogger.logActivity(
        authManager.getCurrentUser().id,
        authManager.getCurrentUser().username,
        'product_deleted',
        `Deleted product: ${product.name}`
      );
      
      setSuccessMessage(`Product "${product.name}" has been deleted.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Check if adding these files would exceed the limit
      const currentCount = formData.images.length;
      if (currentCount + files.length > 5) {
        setErrors({ images: 'Maximum 5 images allowed per product' });
        return;
      }

      // Validate file type and size
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) {
          setErrors({ images: `Please select valid image files` });
          return;
        }

        // Validate file size (max 5MB)
        if (files[i].size > 5 * 1024 * 1024) {
          setErrors({ images: `Image file size must be less than 5MB` });
          return;
        }
      }

      // Process each file
      const newImages = [];
      const newPreviews = [];
      
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          newPreviews.push(e.target.result);
          
          // Update state when all files are processed
          if (newImages.length === files.length) {
            setFormData(prev => ({ 
              ...prev, 
              images: [...prev.images, ...newImages] 
            }));
            setImagePreviews(prev => [...prev, ...newPreviews]);
            setErrors(prev => ({ ...prev, images: '' }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setErrors({ video: 'Please select a valid video file' });
        return;
      }

      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setErrors({ video: 'Video file size must be less than 50MB' });
        return;
      }

      // Validate video duration (max 2 minutes)
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        if (video.duration > 120) { // 2 minutes = 120 seconds
          setErrors({ video: 'Video duration must be less than 2 minutes' });
          return;
        }
        
        // Simulate video upload
        const reader = new FileReader();
        reader.onload = (e) => {
          setVideoPreview(e.target.result);
          setFormData({ ...formData, video: e.target.result });
          setVideoFile(file);
          setErrors({ ...errors, video: '' });
        };
        reader.readAsDataURL(file);
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      brand: formData.brand.trim(),
      stock: parseInt(formData.stock),
      images: formData.images,
      video: formData.video,
      isNew: formData.isNew,
      inStock: formData.inStock
    };

    if (showCreateModal) {
      const newProduct = {
        ...productData,
        id: Math.max(...productList.map(p => p.id)) + 1,
        rating: 0,
        reviews: []
      };
      
      setProductList([...productList, newProduct]);
      
      activityLogger.logActivity(
        authManager.getCurrentUser().id,
        authManager.getCurrentUser().username,
        'product_created',
        `Created new product: ${productData.name}`
      );
      
      setSuccessMessage(`Product "${productData.name}" has been created successfully.`);
    } else {
      const updatedProducts = productList.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      );
      setProductList(updatedProducts);
      
      activityLogger.logActivity(
        authManager.getCurrentUser().id,
        authManager.getCurrentUser().username,
        'product_updated',
        `Updated product: ${productData.name}`
      );
      
      setSuccessMessage(`Product "${productData.name}" has been updated successfully.`);
    }

    setShowCreateModal(false);
    setShowEditModal(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'skincare':
        return 'bg-blue-100 text-blue-800';
      case 'makeup':
        return 'bg-pink-100 text-pink-800';
      case 'haircare':
        return 'bg-purple-100 text-purple-800';
      case 'bodycare':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockBadgeColor = (product) => {
    if (!product.inStock) return 'bg-red-100 text-red-800';
    if (product.stock < 10) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStockText = (product) => {
    if (!product.inStock) return 'Out of Stock';
    if (product.stock < 10) return `Low Stock (${product.stock})`;
    return `In Stock (${product.stock})`;
  };

  const getDiscountPercentage = (product) => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const categories = ['skincare', 'makeup', 'haircare', 'bodycare'];

  // Video Player Component
  const VideoPlayer = ({ src, className = "" }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = React.useRef(null);

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    return (
      <div className={`relative ${className}`}>
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover rounded-lg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
        </div>
        <button
          onClick={toggleMute}
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your K-Beauty product catalog with images and videos</p>
        </div>
        <button
          onClick={handleCreateProduct}
          className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-700">{successMessage}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Stock Status</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="lowStock">Low Stock</option>
            </select>
          </div>

          <div className="text-sm text-gray-500 flex items-center justify-center">
            {filteredProducts.length} products found
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Product Media */}
            <div className="relative h-48 bg-gray-100">
              {product.video ? (
                <VideoPlayer src={product.video} className="h-full" />
              ) : product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              {/* Discount Badge */}
              {getDiscountPercentage(product) > 0 && (
                <div className="absolute top-2 left-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white">
                    -{getDiscountPercentage(product)}%
                  </span>
                </div>
              )}
              
              {/* Stock Badge */}
              <div className="absolute top-2 right-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockBadgeColor(product)}`}>
                  {getStockText(product)}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-pink-600">
                  ${product.price}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadgeColor(product.category)}`}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>

              <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Product Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {showCreateModal ? 'Create New Product' : 'Edit Product'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Product Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.brand ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.brand && (
                      <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.category ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.price ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                    )}
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.stock ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Images (Max 5)
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          multiple
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Upload Images</span>
                        </label>
                        <span className="text-sm text-gray-500">
                          {formData.images.length}/5 images
                        </span>
                      </div>
                      
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-5 gap-2">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload up to 5 images. Max 5MB each. JPG, PNG, or GIF formats.
                    </p>
                    {errors.images && (
                      <p className="text-red-500 text-xs mt-1">{errors.images}</p>
                    )}
                  </div>

                  {/* Video Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Video (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        id="video-upload"
                      />
                      <label
                        htmlFor="video-upload"
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Video className="h-4 w-4" />
                        <span>Upload Video</span>
                      </label>
                      {videoPreview && (
                        <div className="relative h-16 w-24">
                          <video
                            src={videoPreview}
                            className="h-full w-full object-cover rounded-lg"
                            muted
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Max 50MB, 2 minutes duration. MP4, WebM, or OGG formats.
                    </p>
                    {errors.video && (
                      <p className="text-red-500 text-xs mt-1">{errors.video}</p>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="md:col-span-2 flex space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">Mark as New Product</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">In Stock</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      setErrors({});
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    {showCreateModal ? 'Create Product' : 'Update Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement; 