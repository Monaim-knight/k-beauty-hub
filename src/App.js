import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Import pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import ContactUs from './pages/ContactUs';
import HelpCenter from './pages/HelpCenter';
import ShippingInfo from './pages/ShippingInfo';
import ReturnsExchanges from './pages/ReturnsExchanges';
import SizeGuide from './pages/SizeGuide';
import FAQ from './pages/FAQ';

// Import admin pages
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import AdminContent from './pages/AdminContent';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <FavoritesProvider>
          <AdminAuthProvider>
            <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
              <ScrollToTop />
              <div className="App">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Layout><Home /></Layout>} />
                  <Route path="/home" element={<Layout><Home /></Layout>} />
                  <Route path="/products" element={<Layout><Products /></Layout>} />
                  <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
                  <Route path="/about" element={<Layout><About /></Layout>} />
                  <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
                  <Route path="/help" element={<Layout><HelpCenter /></Layout>} />
                  <Route path="/shipping" element={<Layout><ShippingInfo /></Layout>} />
                  <Route path="/returns" element={<Layout><ReturnsExchanges /></Layout>} />
                  <Route path="/size-guide" element={<Layout><SizeGuide /></Layout>} />
                  <Route path="/faq" element={<Layout><FAQ /></Layout>} />

                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="content" element={<AdminContent />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </div>
            </Router>
          </AdminAuthProvider>
        </FavoritesProvider>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App; 