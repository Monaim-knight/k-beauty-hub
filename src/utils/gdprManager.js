// GDPR Compliance Manager - Handles customer consent and data protection
class GDPRManager {
  constructor() {
    this.consentRecords = new Map();
    this.dataRetentionPolicies = {
      customerData: 7 * 365, // 7 years
      feedbackData: 3 * 365, // 3 years
      analyticsData: 2 * 365, // 2 years
      sessionData: 30 // 30 days
    };
    this.initializeConsentRecords();
  }

  // Initialize with sample consent records
  initializeConsentRecords() {
    const sampleConsents = [
      {
        customerId: 1,
        email: 'sarah.johnson@email.com',
        consentGiven: true,
        consentDate: new Date('2024-01-15'),
        consentType: 'marketing',
        dataUsage: ['feedback', 'analytics', 'support'],
        lastUpdated: new Date('2024-01-15'),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        customerId: 2,
        email: 'maria.garcia@email.com',
        consentGiven: true,
        consentDate: new Date('2024-01-20'),
        consentType: 'marketing',
        dataUsage: ['feedback', 'analytics'],
        lastUpdated: new Date('2024-01-20'),
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      {
        customerId: 3,
        email: 'sophie.martin@email.com',
        consentGiven: true,
        consentDate: new Date('2024-01-25'),
        consentType: 'marketing',
        dataUsage: ['feedback', 'support'],
        lastUpdated: new Date('2024-01-25'),
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
      }
    ];

    sampleConsents.forEach(consent => {
      this.consentRecords.set(consent.customerId, consent);
    });
  }

  // Record customer consent
  recordConsent(customerId, consentData) {
    const consentRecord = {
      customerId,
      email: consentData.email,
      consentGiven: consentData.consentGiven,
      consentDate: new Date(),
      consentType: consentData.consentType || 'marketing',
      dataUsage: consentData.dataUsage || ['feedback', 'analytics'],
      lastUpdated: new Date(),
      ipAddress: consentData.ipAddress,
      userAgent: consentData.userAgent,
      language: consentData.language || 'en'
    };

    this.consentRecords.set(customerId, consentRecord);
    console.log(`GDPR consent recorded for customer ${customerId}`);
    return consentRecord;
  }

  // Check if customer has given consent
  hasConsent(customerId, consentType = 'marketing') {
    const record = this.consentRecords.get(customerId);
    return record && record.consentGiven && record.consentType === consentType;
  }

  // Update consent
  updateConsent(customerId, updates) {
    const record = this.consentRecords.get(customerId);
    if (record) {
      Object.assign(record, updates);
      record.lastUpdated = new Date();
      console.log(`GDPR consent updated for customer ${customerId}`);
    }
    return record;
  }

  // Withdraw consent
  withdrawConsent(customerId, reason = '') {
    const record = this.consentRecords.get(customerId);
    if (record) {
      record.consentGiven = false;
      record.withdrawalDate = new Date();
      record.withdrawalReason = reason;
      record.lastUpdated = new Date();
      console.log(`GDPR consent withdrawn for customer ${customerId}`);
    }
    return record;
  }

  // Get consent record
  getConsentRecord(customerId) {
    return this.consentRecords.get(customerId);
  }

  // Check data retention compliance
  checkDataRetention() {
    const now = new Date();
    const expiredRecords = [];

    this.consentRecords.forEach((record, customerId) => {
      const daysSinceConsent = Math.floor((now - record.consentDate) / (1000 * 60 * 60 * 24));
      
      if (daysSinceConsent > this.dataRetentionPolicies.customerData) {
        expiredRecords.push({
          customerId,
          record,
          daysSinceConsent,
          policy: 'customerData'
        });
      }
    });

    return expiredRecords;
  }

  // Clean up expired data
  cleanupExpiredData() {
    const expiredRecords = this.checkDataRetention();
    
    expiredRecords.forEach(({ customerId }) => {
      this.consentRecords.delete(customerId);
      console.log(`Expired GDPR data removed for customer ${customerId}`);
    });

    return expiredRecords.length;
  }

  // Generate GDPR compliance report
  generateComplianceReport() {
    const totalRecords = this.consentRecords.size;
    const activeConsents = Array.from(this.consentRecords.values()).filter(r => r.consentGiven).length;
    const withdrawnConsents = Array.from(this.consentRecords.values()).filter(r => !r.consentGiven).length;
    const expiredRecords = this.checkDataRetention();

    return {
      totalRecords,
      activeConsents,
      withdrawnConsents,
      expiredRecords: expiredRecords.length,
      complianceRate: totalRecords > 0 ? (activeConsents / totalRecords * 100).toFixed(1) : 0,
      lastUpdated: new Date()
    };
  }

  // Export consent data (for compliance audits)
  exportConsentData() {
    return {
      records: Array.from(this.consentRecords.values()),
      policies: this.dataRetentionPolicies,
      report: this.generateComplianceReport()
    };
  }

  // Validate consent for specific data usage
  validateDataUsage(customerId, dataUsage) {
    const record = this.consentRecords.get(customerId);
    if (!record || !record.consentGiven) {
      return false;
    }

    return record.dataUsage.includes(dataUsage);
  }

  // Get consent statistics by type
  getConsentStatistics() {
    const stats = {
      marketing: 0,
      analytics: 0,
      feedback: 0,
      support: 0
    };

    this.consentRecords.forEach(record => {
      if (record.consentGiven) {
        record.dataUsage.forEach(usage => {
          if (stats.hasOwnProperty(usage)) {
            stats[usage]++;
          }
        });
      }
    });

    return stats;
  }
}

// Global GDPR manager instance
let globalGDPRManager = null;

// Initialize the global GDPR manager
export const initializeGDPRManager = () => {
  if (!globalGDPRManager) {
    globalGDPRManager = new GDPRManager();
  }
  return globalGDPRManager;
};

// Get the global GDPR manager instance
export const getGDPRManager = () => {
  if (!globalGDPRManager) {
    initializeGDPRManager();
  }
  return globalGDPRManager;
};

// Record customer consent
export const recordCustomerConsent = (customerId, consentData) => {
  const gdpr = getGDPRManager();
  return gdpr.recordConsent(customerId, consentData);
};

// Check if customer has consent
export const hasCustomerConsent = (customerId, consentType = 'marketing') => {
  const gdpr = getGDPRManager();
  return gdpr.hasConsent(customerId, consentType);
};

// Update customer consent
export const updateCustomerConsent = (customerId, updates) => {
  const gdpr = getGDPRManager();
  return gdpr.updateConsent(customerId, updates);
};

// Withdraw customer consent
export const withdrawCustomerConsent = (customerId, reason = '') => {
  const gdpr = getGDPRManager();
  return gdpr.withdrawConsent(customerId, reason);
};

// Validate data usage
export const validateDataUsage = (customerId, dataUsage) => {
  const gdpr = getGDPRManager();
  return gdpr.validateDataUsage(customerId, dataUsage);
};

// Get compliance report
export const getComplianceReport = () => {
  const gdpr = getGDPRManager();
  return gdpr.generateComplianceReport();
};

// Clean up expired data
export const cleanupExpiredData = () => {
  const gdpr = getGDPRManager();
  return gdpr.cleanupExpiredData();
};

// Export consent data
export const exportConsentData = () => {
  const gdpr = getGDPRManager();
  return gdpr.exportConsentData();
};

export default GDPRManager; 