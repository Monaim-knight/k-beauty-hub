import React from 'react';

const AdminTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Test Page</h1>
        <p className="text-gray-600 mb-4">This is a test page to verify admin routing is working.</p>
        <div className="space-y-2">
          <a 
            href="/admin/login" 
            className="block w-full bg-pink-600 text-white text-center py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-200"
          >
            Go to Admin Login
          </a>
          <a 
            href="/" 
            className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminTest; 