import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Settings
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminDashboard = () => {
  const { currentAdmin } = useAdminAuth();
  const [stats] = useState({
    totalUsers: 1247,
    totalProducts: 89,
    totalRevenue: 45678,
    totalOrders: 234,
    conversionRate: 3.2,
    avgOrderValue: 195.50
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'order',
      message: 'New order #1234 received',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'user',
      message: 'New user registration',
      time: '5 minutes ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'product',
      message: 'Product "Glow Serum" updated',
      time: '10 minutes ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'alert',
      message: 'Low stock alert for "Moisturizer"',
      time: '15 minutes ago',
      status: 'warning'
    }
  ]);

  const [topProducts] = useState([
    { name: 'Glow Serum', sales: 156, revenue: 12480 },
    { name: 'Moisturizer', sales: 142, revenue: 11360 },
    { name: 'Cleanser', sales: 98, revenue: 7840 },
    { name: 'Toner', sales: 87, revenue: 6960 }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {currentAdmin?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your K-Beauty Hub today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last updated</p>
            <p className="text-sm font-medium text-gray-900">Just now</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+12%</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+3</span>
                <span className="text-sm text-gray-500 ml-2">new this week</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+8.2%</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600 ml-1">-0.5%</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200">
            <Package className="h-5 w-5 text-pink-600" />
            <span className="text-sm font-medium text-gray-900">Add Product</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200">
            <Users className="h-5 w-5 text-pink-600" />
            <span className="text-sm font-medium text-gray-900">Manage Users</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200">
            <DollarSign className="h-5 w-5 text-pink-600" />
            <span className="text-sm font-medium text-gray-900">View Orders</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-all duration-200">
            <Settings className="h-5 w-5 text-pink-600" />
            <span className="text-sm font-medium text-gray-900">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 