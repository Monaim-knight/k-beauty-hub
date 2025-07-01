// Activity Logger for tracking user actions
class ActivityLogger {
  constructor() {
    this.activities = [];
    this.initializeSampleActivities();
  }

  initializeSampleActivities() {
    this.activities = [
      {
        id: 1,
        userId: 2,
        username: 'product_manager',
        action: 'product_created',
        details: 'Added new product: COSRX Advanced Snail 96 Mucin Power Essence',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: 2,
        userId: 3,
        username: 'photographer',
        action: 'image_uploaded',
        details: 'Uploaded product images for Laneige Water Sleeping Mask',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      {
        id: 3,
        userId: 4,
        username: 'inventory',
        action: 'stock_updated',
        details: 'Updated stock levels for Innisfree Green Tea Seed Serum (New stock: 150 units)',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: 4,
        userId: 1,
        username: 'admin',
        action: 'user_created',
        details: 'Created new user: Lisa Rodriguez (Inventory Specialist)',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        ipAddress: '192.168.1.103',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: 5,
        userId: 2,
        username: 'product_manager',
        action: 'product_updated',
        details: 'Updated product details for Etude House Dear Darling Water Gel Tint',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    ];
  }

  logActivity(userId, username, action, details, ipAddress = '127.0.0.1', userAgent = 'Unknown') {
    const activity = {
      id: this.activities.length + 1,
      userId,
      username,
      action,
      details,
      timestamp: new Date(),
      ipAddress,
      userAgent
    };

    this.activities.unshift(activity); // Add to beginning for latest first

    // Keep only last 1000 activities for performance
    if (this.activities.length > 1000) {
      this.activities = this.activities.slice(0, 1000);
    }

    // In production, save to database
    console.log('Activity logged:', activity);
    return activity;
  }

  getActivities(filters = {}) {
    let filteredActivities = [...this.activities];

    // Filter by user
    if (filters.userId) {
      filteredActivities = filteredActivities.filter(a => a.userId === filters.userId);
    }

    // Filter by action
    if (filters.action) {
      filteredActivities = filteredActivities.filter(a => a.action === filters.action);
    }

    // Filter by date range
    if (filters.startDate) {
      filteredActivities = filteredActivities.filter(a => a.timestamp >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filteredActivities = filteredActivities.filter(a => a.timestamp <= new Date(filters.endDate));
    }

    // Filter by username
    if (filters.username) {
      filteredActivities = filteredActivities.filter(a => 
        a.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    // Sort by timestamp (newest first)
    filteredActivities.sort((a, b) => b.timestamp - a.timestamp);

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      activities: filteredActivities.slice(startIndex, endIndex),
      total: filteredActivities.length,
      page,
      limit,
      totalPages: Math.ceil(filteredActivities.length / limit)
    };
  }

  getActivityStats() {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const activities24h = this.activities.filter(a => a.timestamp >= last24Hours);
    const activities7d = this.activities.filter(a => a.timestamp >= last7Days);
    const activities30d = this.activities.filter(a => a.timestamp >= last30Days);

    // Group by action type
    const actionCounts = this.activities.reduce((acc, activity) => {
      acc[activity.action] = (acc[activity.action] || 0) + 1;
      return acc;
    }, {});

    // Group by user
    const userCounts = this.activities.reduce((acc, activity) => {
      acc[activity.username] = (acc[activity.username] || 0) + 1;
      return acc;
    }, {});

    return {
      total: this.activities.length,
      last24Hours: activities24h.length,
      last7Days: activities7d.length,
      last30Days: activities30d.length,
      actionCounts,
      userCounts,
      topUsers: Object.entries(userCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([username, count]) => ({ username, count })),
      topActions: Object.entries(actionCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([action, count]) => ({ action, count }))
    };
  }

  getRecentActivities(limit = 10) {
    return this.activities.slice(0, limit);
  }

  getUserActivities(userId, limit = 50) {
    return this.activities
      .filter(a => a.userId === userId)
      .slice(0, limit);
  }

  // GDPR compliance - data export and deletion
  exportUserData(userId) {
    return this.activities.filter(a => a.userId === userId);
  }

  deleteUserData(userId) {
    this.activities = this.activities.filter(a => a.userId !== userId);
    return { success: true, message: 'User activity data deleted' };
  }

  // Clean up old activities (for GDPR compliance)
  cleanupOldActivities(daysOld = 90) {
    const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
    const originalCount = this.activities.length;
    this.activities = this.activities.filter(a => a.timestamp >= cutoffDate);
    const deletedCount = originalCount - this.activities.length;
    
    return {
      success: true,
      deletedCount,
      remainingCount: this.activities.length
    };
  }
}

// Create singleton instance
const activityLogger = new ActivityLogger();

export default activityLogger; 