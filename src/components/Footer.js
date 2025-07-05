import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const quickLinks = [
    { name: t('home'), path: '/' },
    { name: t('products'), path: '/products' },
    { name: t('about'), path: '/about' }
  ];

  const customerService = [
    { name: t('contactUs'), path: '/contact' },
    { name: t('helpCenter'), path: '/help' },
    { name: t('shippingInfo'), path: '/shipping' },
    { name: t('returnsExchanges'), path: '/returns' },
    { name: t('sizeGuide'), path: '/size-guide' },
    { name: t('faq'), path: '/faq' }
  ];

  const legal = [
    { name: t('privacyPolicy'), href: '#' },
    { name: t('termsOfService'), href: '#' },
    { name: t('cookiePolicy'), href: '#' }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/kbeautyhub', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/kbeautyhub', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/kbeautyhub', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@MonaimKnight', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://wa.me/491724516678', label: 'WhatsApp' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">K-Beauty</span>
              <span className="text-xs text-pink-300 font-medium">Hub</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {t('companyDesc')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-pink-400" />
                <span className="text-sm">hello@kbeautyhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-pink-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-pink-400" />
                <span className="text-sm">Seoul, South Korea</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      navigate(link.path);
                      // Scroll to top after navigation
                      setTimeout(() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }, 100);
                    }}
                    className="text-gray-300 hover:text-pink-400 text-sm transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('customerService')}</h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      navigate(link.path);
                      // Scroll to top after navigation
                      setTimeout(() => {
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }, 100);
                    }}
                    className="text-gray-300 hover:text-pink-400 text-sm transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 bg-white/10 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-gray-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4">
              {legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-pink-400 text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 