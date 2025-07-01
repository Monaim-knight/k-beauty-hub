import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageNames = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    bn: 'বাংলা'
  };

  const languageFlags = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷',
    bn: '🇧🇩'
  };

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors"
      >
        <Globe className="h-5 w-5" />
        <span className="hidden sm:block text-sm font-medium">
          {languageNames[currentLanguage]}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {availableLanguages.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  currentLanguage === language ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{languageFlags[language]}</span>
                <span className="font-medium">{languageNames[language]}</span>
                {currentLanguage === language && (
                  <span className="ml-auto text-primary-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher; 