import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Video, 
  Image as ImageIcon,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

// Video Player Component
const VideoPlayer = ({ src, className = "", onPlay, onPause }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onPause?.();
      } else {
        videoRef.current.play();
        onPlay?.();
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
        loop
        muted={isMuted}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-all"
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </button>
      </div>
      {/* Only show mute button when video is playing */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(id));
  
  // Combine images and video into media array
  const mediaItems = [
    ...(product?.images || []).map((image, index) => ({
      type: 'image',
      src: image,
      index
    })),
    ...(product?.video ? [{
      type: 'video',
      src: product.video,
      index: (product.images?.length || 0)
    }] : [])
  ];

  const totalItems = mediaItems.length;
  const currentMedia = mediaItems[currentImageIndex];

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    // Add item to cart first
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity: quantity
    });
    // Then navigate to checkout and scroll to top
    navigate('/checkout');
    window.scrollTo(0, 0);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-pink-600 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className={`p-2 text-gray-600 hover:text-red-600 transition-colors ${
                  isFavorite(product.id) ? 'text-red-600' : ''
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image/Video */}
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-square">
                {currentMedia?.type === 'video' ? (
                  <VideoPlayer 
                    src={currentMedia.src} 
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={currentMedia?.src}
                    alt={`${product.name} - ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Navigation Arrows */}
              {totalItems > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Media Type Badge */}
              <div className="absolute top-4 left-4">
                {currentMedia?.type === 'video' ? (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800">
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    Image {currentImageIndex + 1}
                  </span>
                )}
              </div>

              {/* Counter */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-black bg-opacity-50 text-white">
                  {currentImageIndex + 1} / {totalItems}
                </span>
              </div>

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-red-500 text-white">
                    -{discountPercentage}%
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {totalItems > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {mediaItems.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-pink-500 ring-2 ring-pink-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video
                          src={media.src}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={media.src}
                        alt={`${product.name} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Media Type Indicator */}
                    <div className="absolute bottom-1 right-1">
                      {media.type === 'video' ? (
                        <Video className="h-3 w-3 text-white drop-shadow" />
                      ) : (
                        <ImageIcon className="h-3 w-3 text-white drop-shadow" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">
                {product.brand}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-lg text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                  Save {discountPercentage}%
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg py-4 px-6 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg py-4 px-6 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{t('buyNow')}</span>
              </button>
              
              {!product.inStock && (
                <p className="text-red-600 text-sm text-center">
                  This product is currently out of stock
                </p>
              )}
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">Authentic Korean beauty products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  viewMode="grid" 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 