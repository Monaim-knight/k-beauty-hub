import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to ShopHub
        </h1>
        <p className="text-xl text-gray-600">
          Your ecommerce website is working!
        </p>
        <div className="mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default App; 