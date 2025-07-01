import React, { useState } from 'react';
import { Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Newsletter = ({ className = '' }) => {
  const { t } = useLanguage();
  const [subscriptionType, setSubscriptionType] = useState('email'); // 'email' or 'phone'
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Accepts international phone numbers with or without +, spaces, dashes, parentheses
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    return phoneRegex.test(cleanPhone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!value.trim()) {
      setStatus('error');
      return;
    }

    let isValid = false;
    if (subscriptionType === 'email') {
      isValid = validateEmail(value);
    } else {
      isValid = validatePhone(value);
    }

    if (!isValid) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      setValue('');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
    if (status === 'error') {
      setStatus(null);
    }
  };

  const getPlaceholder = () => {
    if (subscriptionType === 'email') {
      return t('enterEmail');
    } else {
      return t('enterPhone');
    }
  };

  const getInputType = () => {
    return subscriptionType === 'email' ? 'email' : 'tel';
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${className}`}>
      <h4 className="text-lg font-semibold mb-4">{t('stayUpdated')}</h4>
      <p className="text-gray-600 mb-6">
        {t('stayUpdatedDesc')}
      </p>

      {/* Subscription Type Toggle */}
      <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => {
            setSubscriptionType('email');
            setValue('');
            setStatus(null);
          }}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            subscriptionType === 'email'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>{t('subscribeByEmail')}</span>
        </button>
        <button
          onClick={() => {
            setSubscriptionType('phone');
            setValue('');
            setStatus(null);
          }}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            subscriptionType === 'phone'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Phone className="h-4 w-4" />
          <span>{t('subscribeByPhone')}</span>
        </button>
      </div>

      {/* Subscription Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type={getInputType()}
            value={value}
            onChange={handleInputChange}
            placeholder={getPlaceholder()}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
              status === 'error' 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-300 focus:border-primary-500'
            }`}
            disabled={isSubmitting}
          />
          {subscriptionType === 'email' && (
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          )}
          {subscriptionType === 'phone' && (
            <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          )}
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{t('newsletterSuccess')}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{t('newsletterError')}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !value.trim()}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>{t('processing')}</span>
            </div>
          ) : (
            t('subscribe')
          )}
        </button>
      </form>

      {/* Additional Info */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        {subscriptionType === 'email' 
          ? 'We\'ll send you updates via email'
          : 'We\'ll send you updates via SMS'
        }
      </p>
    </div>
  );
};

export default Newsletter; 