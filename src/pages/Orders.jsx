import React from 'react';

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
          
          {/* Order Status Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button className="flex-1 py-2 px-4 text-sm font-medium text-white bg-red-500 rounded-md">
              All Orders
            </button>
            <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900">
              Pending
            </button>
            <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900">
              Delivered
            </button>
            <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900">
              Cancelled
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {/* Order 1 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Order #12345</h3>
                  <p className="text-sm text-gray-500">Placed on Dec 15, 2024</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Delivered
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <img 
                  src="/logo.png" 
                  alt="Product" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Chicken Curry Cut</h4>
                  <p className="text-sm text-gray-500">500g • 2 pieces</p>
                  <p className="text-sm text-gray-500">₹250</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹250</p>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <p>Total: ₹250</p>
                  <p>Delivered on Dec 16, 2024</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    View Details
                  </button>
                  <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                    Reorder
                  </button>
                </div>
              </div>
            </div>

            {/* Order 2 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Order #12344</h3>
                  <p className="text-sm text-gray-500">Placed on Dec 14, 2024</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                  Processing
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <img 
                  src="/logo.png" 
                  alt="Product" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Mutton Curry Cut</h4>
                  <p className="text-sm text-gray-500">1kg • 4 pieces</p>
                  <p className="text-sm text-gray-500">₹450</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹450</p>
                  <p className="text-sm text-gray-500">Qty: 1</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <p>Total: ₹450</p>
                  <p>Expected delivery: Dec 17, 2024</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    View Details
                  </button>
                  <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                    Track Order
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">📦</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
