import React from 'react';

export default function Refer() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Refer a Friend</h1>
          
          {/* Referral Banner */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Earn ₹100 for each friend!</h2>
                <p className="text-red-100">Share your referral code and both you and your friend get ₹100 off on your next order</p>
              </div>
              <div className="text-right">
                <div className="text-4xl mb-2">🎁</div>
                <div className="text-sm text-red-100">Limited Time</div>
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Code</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-gray-900">PFM2024</span>
              </div>
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
                Copy Code
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3">Share this code with your friends to earn rewards</p>
          </div>

          {/* Share Options */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share via</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl">📱</span>
                </div>
                <span className="text-sm font-medium text-gray-900">WhatsApp</span>
              </button>
              
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl">📧</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Email</span>
              </button>
              
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl">📘</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Facebook</span>
              </button>
              
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl">🐦</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Twitter</span>
              </button>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
              <div className="text-sm text-blue-800">Friends Referred</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">₹500</div>
              <div className="text-sm text-green-800">Total Earned</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">₹100</div>
              <div className="text-sm text-purple-800">Available Balance</div>
            </div>
          </div>

          {/* Referral History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral History</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">Referred on Dec 10, 2024</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">+₹100</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Jane Smith</p>
                    <p className="text-sm text-gray-500">Referred on Dec 8, 2024</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">+₹100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
