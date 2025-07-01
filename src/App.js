import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import About from './pages/About';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import IntegratedChatbot from './components/IntegratedChatbot';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCheckout = () => {
    setIsCartOpen(false);
  };

  const isClientMode = () => {
    // Check if we're in client mode (can be set via URL parameter or environment)
    return window.location.search.includes('client=true') || 
           process.env.REACT_APP_CLIENT_MODE === 'true';
  };

  return (
    <Router>
      <LanguageProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <Header onCartClick={() => setIsCartOpen(true)} />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home onAddToCart={() => setIsCartOpen(true)} />} />
                  <Route path="/products" element={<Products onAddToCart={() => setIsCartOpen(true)} />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/checkout" element={<Checkout onBack={() => window.history.back()} />} />
                  {!isClientMode() && <Route path="/admin" element={<Admin />} />}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              
              <Footer />
              
              <Cart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                onCheckout={handleCheckout}
              />
              
              <IntegratedChatbot />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App; 