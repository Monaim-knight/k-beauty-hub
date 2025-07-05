import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Mock admin users (in real app, this would come from a database)
const ADMIN_USERS = [
  {
    id: 1,
    email: 'admin@kbeautyhub.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Super Admin',
    role: 'admin',
    permissions: ['all']
  },
  {
    id: 2,
    email: 'editor@kbeautyhub.com',
    password: 'editor123',
    name: 'Content Editor',
    role: 'editor',
    permissions: ['products', 'content', 'users_view']
  },
  {
    id: 3,
    email: 'viewer@kbeautyhub.com',
    password: 'viewer123',
    name: 'Viewer',
    role: 'viewer',
    permissions: ['dashboard', 'reports_view']
  }
];

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        const admin = ADMIN_USERS.find(user => user.id === session.userId);
        if (admin) {
          setCurrentAdmin(admin);
        }
      } catch (error) {
        console.error('Error parsing admin session:', error);
        localStorage.removeItem('adminSession');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const admin = ADMIN_USERS.find(
      user => user.email === email && user.password === password
    );

    if (admin) {
      setCurrentAdmin(admin);
      localStorage.setItem('adminSession', JSON.stringify({
        userId: admin.id,
        timestamp: Date.now()
      }));
      return { success: true, admin };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('adminSession');
  };

  const hasPermission = (permission) => {
    if (!currentAdmin) return false;
    
    if (currentAdmin.permissions.includes('all')) return true;
    return currentAdmin.permissions.includes(permission);
  };

  const canAccess = (requiredPermissions) => {
    if (!currentAdmin) return false;
    
    if (currentAdmin.permissions.includes('all')) return true;
    
    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.some(permission => 
        currentAdmin.permissions.includes(permission)
      );
    }
    
    return currentAdmin.permissions.includes(requiredPermissions);
  };

  const value = {
    currentAdmin,
    isLoading,
    login,
    logout,
    hasPermission,
    canAccess,
    isAuthenticated: !!currentAdmin
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}; 