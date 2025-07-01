// Authentication and Role-Based Access Control Manager
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.roles = {
      ADMIN: 'admin',
      PRODUCT_MANAGER: 'product_manager',
      PHOTOGRAPHER: 'photographer',
      INVENTORY_SPECIALIST: 'inventory_specialist'
    };
    
    this.permissions = {
      admin: [
        'user_management',
        'product_management',
        'inventory_management',
        'image_upload',
        'dashboard_access',
        'activity_logs',
        'role_assignment',
        'system_settings'
      ],
      product_manager: [
        'product_management',
        'inventory_management',
        'dashboard_access',
        'activity_logs'
      ],
      photographer: [
        'product_management',
        'image_upload',
        'activity_logs'
      ],
      inventory_specialist: [
        'inventory_management',
        'activity_logs'
      ]
    };
    
    this.initializeSampleUsers();
  }

  initializeSampleUsers() {
    this.users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123', // In production, use hashed passwords
        email: 'admin@kbeautyhub.com',
        role: this.roles.ADMIN,
        name: 'System Administrator',
        createdAt: new Date('2020-01-01'),
        lastLogin: new Date(),
        isActive: true
      },
      {
        id: 2,
        username: 'product_manager',
        password: 'pm123',
        email: 'pm@kbeautyhub.com',
        role: this.roles.PRODUCT_MANAGER,
        name: 'Sarah Johnson',
        createdAt: new Date('2021-03-15'),
        lastLogin: new Date(),
        isActive: true
      },
      {
        id: 3,
        username: 'photographer',
        password: 'photo123',
        email: 'photo@kbeautyhub.com',
        role: this.roles.PHOTOGRAPHER,
        name: 'Mike Chen',
        createdAt: new Date('2021-06-20'),
        lastLogin: new Date(),
        isActive: true
      },
      {
        id: 4,
        username: 'inventory',
        password: 'inv123',
        email: 'inventory@kbeautyhub.com',
        role: this.roles.INVENTORY_SPECIALIST,
        name: 'Lisa Rodriguez',
        createdAt: new Date('2021-09-10'),
        lastLogin: new Date(),
        isActive: true
      }
    ];
  }

  login(username, password) {
    console.log('Login attempt:', { username, password });
    
    // Ensure users are initialized
    this.ensureInitialized();
    
    console.log('Available users:', this.users);
    
    const user = this.users.find(u => 
      u.username === username && 
      u.password === password && 
      u.isActive
    );

    console.log('Found user:', user);

    if (user) {
      this.currentUser = { ...user };
      this.isAuthenticated = true;
      user.lastLogin = new Date();
      
      // Store session in localStorage (in production, use secure tokens)
      localStorage.setItem('adminSession', JSON.stringify({
        userId: user.id,
        username: user.username,
        role: user.role,
        loginTime: new Date().toISOString()
      }));

      return { success: true, user: this.currentUser };
    }

    return { success: false, error: 'Invalid credentials' };
  }

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('adminSession');
    return { success: true };
  }

  checkSession() {
    const session = localStorage.getItem('adminSession');
    if (session) {
      const sessionData = JSON.parse(session);
      const user = this.users.find(u => u.id === sessionData.userId);
      
      if (user && user.isActive) {
        this.currentUser = { ...user };
        this.isAuthenticated = true;
        return true;
      }
    }
    return false;
  }

  hasPermission(permission) {
    if (!this.currentUser) return false;
    
    const userPermissions = this.permissions[this.currentUser.role] || [];
    return userPermissions.includes(permission);
  }

  hasRole(role) {
    if (!this.currentUser) return false;
    return this.currentUser.role === role;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  // User Management (Admin only)
  createUser(userData) {
    if (!this.hasPermission('user_management')) {
      return { success: false, error: 'Insufficient permissions' };
    }

    const newUser = {
      id: this.users.length + 1,
      ...userData,
      createdAt: new Date(),
      lastLogin: null,
      isActive: true
    };

    this.users.push(newUser);
    return { success: true, user: newUser };
  }

  updateUser(userId, updates) {
    if (!this.hasPermission('user_management')) {
      return { success: false, error: 'Insufficient permissions' };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return { success: true, user: this.users[userIndex] };
  }

  deleteUser(userId) {
    if (!this.hasPermission('user_management')) {
      return { success: false, error: 'Insufficient permissions' };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    // Soft delete - mark as inactive
    this.users[userIndex].isActive = false;
    return { success: true };
  }

  getAllUsers() {
    if (!this.hasPermission('user_management')) {
      return [];
    }
    return this.users.filter(u => u.isActive);
  }

  // Method to get all users without permission check (for debugging)
  getAllUsersDebug() {
    return this.users.filter(u => u.isActive);
  }

  getRoles() {
    return Object.values(this.roles);
  }

  getPermissions() {
    return this.permissions;
  }

  // Debug method to check initialization
  getDebugInfo() {
    return {
      usersCount: this.users ? this.users.length : 0,
      users: this.users,
      isAuthenticated: this.isAuthenticated,
      currentUser: this.currentUser,
      roles: this.roles
    };
  }

  // Method to ensure users are initialized
  ensureInitialized() {
    if (!this.users || this.users.length === 0) {
      console.log('Reinitializing users...');
      this.initializeSampleUsers();
    }
    return this.users.length > 0;
  }

  // Method to reinitialize (for debugging)
  reinitialize() {
    this.initializeSampleUsers();
    console.log('AuthManager reinitialized with users:', this.users.length);
  }
}

// Create singleton instance
let authManagerInstance = null;

const getAuthManager = () => {
  if (!authManagerInstance) {
    authManagerInstance = new AuthManager();
    console.log('AuthManager initialized with users:', authManagerInstance.users.length);
  }
  return authManagerInstance;
};

const authManager = getAuthManager();

export default authManager; 