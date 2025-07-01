import React, { useState, useRef } from 'react';
import { Star, ShoppingCart, Heart, Eye, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

// Video Player Component
const VideoPlayer = ({ src, className = "", onPlay, onPause }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

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
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        loop
        muted={isMuted}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlay}
          className="bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
      </div>
      {/* Only show mute button when video is playing */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
};

const ProductCard = ({ product, viewMode = 'grid', onBuyNow }) => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image, // Use first image for cart
      quantity: 1
    });
  };

  const handleBuyNow = () => {
    // Add item to cart first
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity: 1
    });
    // Then navigate to checkout and scroll to top
    navigate('/checkout');
    window.scrollTo(0, 0);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderMedia = () => {
    const hasImages = product.images && product.images.length > 0;
    const hasVideos = product.videos && product.videos.length > 0;
    
    if (!hasImages && !hasVideos) {
      return (
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      );
    }

    // Render product media (image or video) with click handler
    const renderProductMedia = (className = "") => {
      const mediaElement = product.video ? (
        <VideoPlayer src={product.video} className={className} />
      ) : (
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className={className}
        />
      );

      return (
        <div 
          onClick={handleProductClick}
          className="cursor-pointer hover:opacity-90 transition-opacity"
        >
          {mediaElement}
        </div>
      );
    };

    return (
      <div className="relative">
        {renderProductMedia("w-full h-48 object-cover")}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-1 transition-opacity duration-300 ${
          isFavorite(product.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <button
            onClick={handleToggleFavorite}
            className={`p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors ${
              isFavorite(product.id) ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleProductClick}
            className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden w-full">
        <div className="flex">
          {/* Product Media */}
          <div className="w-48 h-48 flex-shrink-0">
            {renderMedia()}
          </div>
          
          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-pink-600 transition-colors"
                  onClick={handleProductClick}
                >
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
              </div>
              
              {/* Price and Badges */}
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  {discountPercentage > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              
              <span className="text-sm text-gray-500 capitalize">
                {product.category}
              </span>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg py-3 px-4 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{product.inStock ? t('addToCart') : t('outOfStock')}</span>
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg py-3 px-4 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{t('buyNow')}</span>
              </button>
              
              <button
                onClick={handleToggleFavorite}
                className={`p-3 text-gray-400 hover:text-pink-600 transition-colors ${
                  isFavorite(product.id) ? 'text-red-600' : ''
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                onClick={handleProductClick}
                className="p-3 text-gray-400 hover:text-pink-600 transition-colors"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group w-full h-full flex flex-col">
      {/* Product Media */}
      {renderMedia()}
      
      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 
          className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-pink-600 transition-colors"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg py-3 px-4 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{product.inStock ? t('addToCart') : t('outOfStock')}</span>
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg py-3 px-4 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>{t('buyNow')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 