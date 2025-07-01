import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Package, 
  Image, 
  Activity, 
  Settings, 
  LogOut, 
  User,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import authManager from '../utils/authManager';
import activityLogger from '../utils/activityLogger';
import { products } from '../data/products';
import UserManagement from './UserManagement';
import ActivityLogs from './ActivityLogs';
import ProductManagement from './ProductManagement';

const AdminDashboard = ({ onLogout }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const user = authManager.getCurrentUser();
    setCurrentUser(user);
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load activity statistics
    const activityStats = activityLogger.getActivityStats();
    
    // Calculate product statistics
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.inStock && p.stock < 10).length;
    const outOfStockProducts = products.filter(p => !p.inStock).length;
    const newProducts = products.filter(p => p.isNew).length;

    setStats({
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      newProducts,
      ...activityStats
    });

    // Load recent activities
    setRecentActivities(activityLogger.getRecentActivities(10));
  };

  const handleLogout = () => {
    authManager.logout();
    onLogout();
  };

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      permission: 'dashboard_access'
    },
    {
      id: 'products',
      label: 'Product Management',
      icon: Package,
      permission: 'product_management'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: TrendingUp,
      permission: 'inventory_management'
    },
    {
      id: 'images',
      label: 'Image Upload',
      icon: Image,
      permission: 'image_upload'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      permission: 'user_management'
    },
    {
      id: 'activities',
      label: 'Activity Logs',
      icon: Activity,
      permission: 'activity_logs'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      permission: 'system_settings'
    }
  ];

  const filteredNavigation = navigationItems.filter(item => 
    authManager.hasPermission(item.permission)
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {currentUser?.name}!
        </h2>
        <p className="text-pink-100">
          Role: {currentUser?.role.replace('_', ' ').toUpperCase()}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <Package className="h-8 w-8 text-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Alert</p>
              <p className="text-3xl font-bold text-orange-600">{stats.lowStockProducts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Products</p>
              <p className="text-3xl font-bold text-green-600">{stats.newProducts}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activities (24h)</p>
              <p className="text-3xl font-bold text-purple-600">{stats.last24Hours}</p>
            </div>
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="bg-pink-100 rounded-full p-2">
                  <Activity className="h-4 w-4 text-pink-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.details}</p>
                  <p className="text-xs text-gray-500">
                    {activity.username} • {activity.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <ProductManagement />
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Inventory Management</h2>
        <p className="text-gray-600">Inventory management interface will be implemented here.</p>
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Image Upload</h2>
        <p className="text-gray-600">Image upload interface will be implemented here.</p>
      </div>
    </div>
  );

  const renderUsers = () => (
    <UserManagement />
  );

  const renderActivities = () => (
    <ActivityLogs />
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
        <p className="text-gray-600">System settings interface will be implemented here.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'products':
        return renderProducts();
      case 'inventory':
        return renderInventory();
      case 'images':
        return renderImages();
      case 'users':
        return renderUsers();
      case 'activities':
        return renderActivities();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-2">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">K-Beauty Hub Admin</h1>
                <p className="text-sm text-gray-500">Administration Panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-pink-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 