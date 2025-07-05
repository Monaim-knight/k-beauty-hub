import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Activity,
  FileText,
  BarChart3,
  Shield,
  User,
  ChevronDown,
  Home
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentAdmin, logout, canAccess } = useAdminAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      permissions: ['dashboard', 'all']
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package,
      permissions: ['products', 'all']
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users,
      permissions: ['users', 'all']
    },
    {
      name: 'Content',
      href: '/admin/content',
      icon: FileText,
      permissions: ['content', 'all']
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      permissions: ['analytics', 'all']
    },
    {
      name: 'Activity Logs',
      href: '/admin/activity-logs',
      icon: Activity,
      permissions: ['activity_logs', 'all']
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      permissions: ['settings', 'all']
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const filteredNavigation = navigation.filter(item => 
    canAccess(item.permissions)
  );

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current page name
  const getCurrentPageName = () => {
    const currentPage = filteredNavigation.find(item => isActive(item.href));
    return currentPage ? currentPage.name : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left side - Admin Panel Dropdown */}
          <div className="flex items-center space-x-4">
            {/* Admin Panel Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span>Admin Panel</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {/* Current Page Indicator */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Current Page</p>
                      <p className="text-sm font-medium text-gray-900">{getCurrentPageName()}</p>
                    </div>

                    {/* Navigation Items */}
                    <nav className="py-2">
                      {filteredNavigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.name}
                            onClick={() => {
                              navigate(item.href);
                              setDropdownOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                              isActive(item.href)
                                ? 'bg-pink-50 text-pink-700 border-r-2 border-pink-500'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </button>
                        );
                      })}
                    </nav>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-2"></div>

                    {/* User Info and Logout */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {currentAdmin?.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {currentAdmin?.role}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Home Button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Bell className="h-5 w-5" />
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentAdmin?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentAdmin?.role}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 