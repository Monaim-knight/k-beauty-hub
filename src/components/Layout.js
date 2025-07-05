import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartClick={handleCartClick} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
    </div>
  );
};

export default Layout; 