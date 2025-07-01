import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Video, Image as ImageIcon } from 'lucide-react';

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

const ProductGallery = ({ product, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Combine images and video into media array
  const mediaItems = [
    ...(product.images || []).map((image, index) => ({
      type: 'image',
      src: image,
      index
    })),
    ...(product.video ? [{
      type: 'video',
      src: product.video,
      index: (product.images?.length || 0)
    }] : [])
  ];

  const totalItems = mediaItems.length;

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToItem = (index) => {
    setCurrentIndex(index);
  };

  const currentMedia = mediaItems[currentIndex];

  if (!totalItems) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-2" />
          <p>No media available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Display Area */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        {/* Main Media Display */}
        <div className="aspect-square">
          {currentMedia?.type === 'video' ? (
            <VideoPlayer 
              src={currentMedia.src} 
              className="w-full h-full"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />
          ) : (
            <img
              src={currentMedia?.src}
              alt={`${product.name} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Navigation Arrows */}
        {totalItems > 1 && (
          <>
            <button
              onClick={prevItem}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextItem}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Media Type Badge */}
        <div className="absolute top-2 left-2">
          {currentMedia?.type === 'video' ? (
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
              <Video className="h-3 w-3 mr-1" />
              Video
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              <ImageIcon className="h-3 w-3 mr-1" />
              Image {currentIndex + 1}
            </span>
          )}
        </div>

        {/* Counter */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-black bg-opacity-50 text-white">
            {currentIndex + 1} / {totalItems}
          </span>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {totalItems > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {mediaItems.map((media, index) => (
            <button
              key={index}
              onClick={() => goToItem(index)}
              className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
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
                  <Video className="h-2 w-2 text-white drop-shadow" />
                ) : (
                  <ImageIcon className="h-2 w-2 text-white drop-shadow" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Keyboard Navigation Info */}
      {totalItems > 1 && (
        <div className="text-xs text-gray-500 text-center">
          Use arrow keys or click thumbnails to navigate • {product.images?.length || 0} images • {product.video ? '1 video' : '0 videos'}
        </div>
      )}
    </div>
  );
};

export default ProductGallery; 