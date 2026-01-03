import React from 'react';

export default function Rewards() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Rewards</h1>
          
          {/* Rewards Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🎁</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Points</h3>
                  <p className="text-2xl font-bold text-red-600">1,250</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Available Cashback</h3>
                  <p className="text-2xl font-bold text-green-600">₹125</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🏆</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Level</h3>
                  <p className="text-2xl font-bold text-blue-600">Gold</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Rewards */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Rewards</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">+</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Order #12345</p>
                    <p className="text-sm text-gray-500">Earned 50 points</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">+50 pts</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">-</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Redeemed Voucher</p>
                    <p className="text-sm text-gray-500">Used 100 points</p>
                  </div>
                </div>
                <span className="text-red-600 font-semibold">-100 pts</span>
              </div>
            </div>
          </div>

          {/* Available Rewards */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">₹50 Off</h3>
                  <span className="text-sm text-gray-500">500 pts</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Get ₹50 off on orders above ₹500</p>
                <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                  Redeem
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Free Delivery</h3>
                  <span className="text-sm text-gray-500">200 pts</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Free delivery on your next order</p>
                <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors">
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
