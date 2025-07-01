import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Shield, Key } from 'lucide-react';
import authManager from '../utils/authManager';
import activityLogger from '../utils/activityLogger';

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for existing session
    if (authManager.checkSession()) {
      const currentUser = authManager.getCurrentUser();
      setIsAdmin(currentUser?.role === 'admin');
      onLoginSuccess(currentUser);
    }
  }, [onLoginSuccess]);

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
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Debug: Check authManager state
      console.log('AuthManager debug info:', authManager.getDebugInfo());
      
      // Ensure authManager is initialized
      authManager.ensureInitialized();
      
      const result = authManager.login(formData.username, formData.password);
      
      console.log('Login result:', result);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setIsAdmin(result.user?.role === 'admin');
        
        // Log the login activity
        activityLogger.logActivity(
          result.user.id,
          result.user.username,
          'user_login',
          'User logged into admin panel',
          '127.0.0.1',
          navigator.userAgent
        );

        // Simulate loading delay
        setTimeout(() => {
          onLoginSuccess(result.user);
        }, 1000);
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebugReinitialize = () => {
    authManager.reinitialize();
    console.log('AuthManager reinitialized. Debug info:', authManager.getDebugInfo());
  };

  const demoCredentials = [
    { role: 'Admin', username: 'admin', password: 'admin123' },
    { role: 'Product Manager', username: 'product_manager', password: 'pm123' },
    { role: 'Photographer', username: 'photographer', password: 'photo123' },
    { role: 'Inventory Specialist', username: 'inventory', password: 'inv123' }
  ];

  // Only show credentials in development mode or to authenticated admins
  const shouldShowCredentials = process.env.NODE_ENV === 'development' || isAdmin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-600">
            Sign in to access K-Beauty Hub administration
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Secure Demo Credentials Section - Only visible to admins or in development */}
          {shouldShowCredentials && (
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-800">
                    {isAdmin ? 'Admin Access - Demo Credentials' : 'Development Mode - Demo Credentials'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {showCredentials ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showCredentials && (
                <div className="space-y-2">
                  {demoCredentials.map((cred, index) => (
                    <div key={index} className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
                      <span className="font-medium">{cred.role}:</span> {cred.username} / {cred.password}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-3 text-xs text-blue-600">
                {isAdmin ? 
                  '🔐 Admin access granted. Demo credentials are available for testing.' :
                  '🛠️ Development mode active. Demo credentials are available for testing.'
                }
              </div>
            </div>
          )}

          {/* Regular Users - No Credentials Shown */}
          {!shouldShowCredentials && (
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Key className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Need Access?
                </h3>
              </div>
              <p className="text-xs text-gray-600">
                Contact your system administrator for login credentials. 
                Demo credentials are only available to authorized personnel.
              </p>
            </div>
          )}

          {/* Debug Section - Only in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                Debug Tools (Development Only)
              </h3>
              <button
                type="button"
                onClick={handleDebugReinitialize}
                className="text-xs px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Reinitialize AuthManager
              </button>
              <p className="text-xs text-yellow-700 mt-2">
                Click this button if you're having login issues. Check browser console for debug info.
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 This is a secure admin panel. All activities are logged for security purposes.
            </p>
            {!shouldShowCredentials && (
              <p className="text-xs text-gray-400 mt-1">
                Demo credentials are hidden for security.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 