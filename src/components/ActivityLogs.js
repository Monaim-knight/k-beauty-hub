import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Activity, 
  Download, 
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  Eye
} from 'lucide-react';
import activityLogger from '../utils/activityLogger';
import authManager from '../utils/authManager';

const ActivityLogs = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    user: '',
    action: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 50
  });
  const [stats, setStats] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadActivities();
    loadStats();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activities, filters]);

  const loadActivities = () => {
    setLoading(true);
    const result = activityLogger.getActivities(filters);
    setActivities(result.activities);
    setLoading(false);
  };

  const loadStats = () => {
    const activityStats = activityLogger.getActivityStats();
    setStats(activityStats);
  };

  const applyFilters = () => {
    let filtered = [...activities];

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(activity =>
        activity.details.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.username.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by user
    if (filters.user) {
      filtered = filtered.filter(activity =>
        activity.username.toLowerCase().includes(filters.user.toLowerCase())
      );
    }

    // Filter by action
    if (filters.action) {
      filtered = filtered.filter(activity => activity.action === filters.action);
    }

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(activity => 
        activity.timestamp >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(activity => 
        activity.timestamp <= new Date(filters.endDate)
      );
    }

    setFilteredActivities(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      user: '',
      action: '',
      startDate: '',
      endDate: '',
      page: 1,
      limit: 50
    });
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'user_login':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'user_created':
        return <Plus className="h-4 w-4 text-blue-600" />;
      case 'user_updated':
        return <Edit className="h-4 w-4 text-yellow-600" />;
      case 'user_deleted':
        return <Trash2 className="h-4 w-4 text-red-600" />;
      case 'product_created':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'product_updated':
        return <Edit className="h-4 w-4 text-blue-600" />;
      case 'image_uploaded':
        return <Eye className="h-4 w-4 text-purple-600" />;
      case 'stock_updated':
        return <Activity className="h-4 w-4 text-orange-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionBadgeColor = (action) => {
    switch (action) {
      case 'user_login':
        return 'bg-green-100 text-green-800';
      case 'user_created':
        return 'bg-blue-100 text-blue-800';
      case 'user_updated':
        return 'bg-yellow-100 text-yellow-800';
      case 'user_deleted':
        return 'bg-red-100 text-red-800';
      case 'product_created':
        return 'bg-green-100 text-green-800';
      case 'product_updated':
        return 'bg-blue-100 text-blue-800';
      case 'image_uploaded':
        return 'bg-purple-100 text-purple-800';
      case 'stock_updated':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionDisplayName = (action) => {
    return action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  };

  const exportActivities = () => {
    const csvContent = [
      ['ID', 'User', 'Action', 'Details', 'Timestamp', 'IP Address'],
      ...filteredActivities.map(activity => [
        activity.id,
        activity.username,
        activity.action,
        activity.details,
        activity.timestamp.toISOString(),
        activity.ipAddress
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const actionTypes = [
    'user_login',
    'user_created',
    'user_updated',
    'user_deleted',
    'product_created',
    'product_updated',
    'image_uploaded',
    'stock_updated'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
          <p className="text-gray-600">Track all user activities and system events</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={loadActivities}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportActivities}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total || 0}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last 24 Hours</p>
              <p className="text-3xl font-bold text-green-600">{stats.last24Hours || 0}</p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last 7 Days</p>
              <p className="text-3xl font-bold text-purple-600">{stats.last7Days || 0}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-orange-600">{stats.topUsers?.length || 0}</p>
            </div>
            <User className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User
              </label>
              <input
                type="text"
                placeholder="Filter by user..."
                value={filters.user}
                onChange={(e) => handleFilterChange('user', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Action Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Action Type
              </label>
              <select
                value={filters.action}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Actions</option>
                {actionTypes.map(action => (
                  <option key={action} value={action}>
                    {getActionDisplayName(action)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span>Loading activities...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No activities found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getActionIcon(activity.action)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.details}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {activity.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionBadgeColor(activity.action)}`}>
                        {getActionDisplayName(activity.action)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatTimestamp(activity.timestamp)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.ipAddress}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Info */}
      {filteredActivities.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredActivities.length} of {activities.length} activities
            </span>
            <span>
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs; 