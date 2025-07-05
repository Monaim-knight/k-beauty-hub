import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAdminAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting to admin dashboard...');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const demoAccounts = [
    { email: 'admin@kbeautyhub.com', password: 'admin123', role: 'Super Admin' },
    { email: 'editor@kbeautyhub.com', password: 'editor123', role: 'Content Editor' },
    { email: 'viewer@kbeautyhub.com', password: 'viewer123', role: 'Viewer' }
  ];

  const fillDemoAccount = (account) => {
    setFormData({
      email: account.email,
      password: account.password
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-sm text-pink-300 font-medium">K-Beauty Hub</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
          <p className="text-gray-300">Access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8">
            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/90"
                  placeholder="Enter your email"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/90"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-100 border border-red-300 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-100 border border-green-300 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-700 text-sm">{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Accounts */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Demo Accounts</h3>
          <div className="space-y-3">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => fillDemoAccount(account)}
                className="w-full text-left p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 border border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{account.role}</p>
                    <p className="text-gray-300 text-sm">{account.email}</p>
                  </div>
                  <span className="text-pink-300 text-xs">Click to fill</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            ← Back to K-Beauty Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 