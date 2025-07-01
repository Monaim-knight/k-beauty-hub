import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Heart, User, Settings, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ onCartClick }) => {
  const { state } = useCart();
  const { t } = useLanguage();
  const { getFavoritesCount } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = getFavoritesCount();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleNavigation = (path) => {
    // If clicking a button while already on that page, scroll to top
    if (path === location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    // Open admin in new tab
    window.open('/admin', '_blank');
    setIsMenuOpen(false);
  };

  const isClientMode = () => {
    // Check if we're in client mode (can be set via URL parameter or environment)
    return window.location.search.includes('client=true') || 
           process.env.REACT_APP_CLIENT_MODE === 'true';
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">K-Beauty</span>
              <span className="text-xs text-pink-600 font-medium">Hub</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/')}
              className={`font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              {t('home')}
            </button>
            <button 
              onClick={() => handleNavigation('/products')}
              className={`font-medium transition-colors duration-200 ${
                isActive('/products') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              {t('products')}
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className={`font-medium transition-colors duration-200 flex items-center ${
                isActive('/about') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              <Info className="h-4 w-4 mr-1" />
              About
            </button>
            {!isClientMode() && (
              <button 
                onClick={handleAdminClick}
                className={`font-medium transition-colors duration-200 flex items-center ${
                  isActive('/admin') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                <Settings className="h-4 w-4 mr-1" />
                Admin
              </button>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* User Account */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 text-gray-600 hover:text-pink-600 transition-colors duration-200">
              <User className="h-5 w-5" />
            </button>

            {/* Favorites */}
            <button className={`relative hidden md:flex items-center justify-center w-10 h-10 transition-colors duration-200 ${
              favoritesCount > 0 ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
            }`}>
              <Heart className={`h-5 w-5 ${favoritesCount > 0 ? 'fill-current' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative flex items-center justify-center w-10 h-10 text-gray-600 hover:text-pink-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-pink-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              <button 
                onClick={() => handleNavigation('/')}
                className={`text-left font-medium py-2 transition-colors duration-200 ${
                  isActive('/') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {t('home')}
              </button>
              <button 
                onClick={() => handleNavigation('/products')}
                className={`text-left font-medium py-2 transition-colors duration-200 ${
                  isActive('/products') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {t('products')}
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className={`text-left font-medium py-2 transition-colors duration-200 flex items-center ${
                  isActive('/about') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                <Info className="h-4 w-4 mr-2" />
                About
              </button>
              {!isClientMode() && (
                <button 
                  onClick={handleAdminClick}
                  className={`text-left font-medium py-2 transition-colors duration-200 flex items-center ${
                    isActive('/admin') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 