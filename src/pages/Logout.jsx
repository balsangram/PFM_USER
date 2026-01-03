import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_ASSETS } from '../assets/images/imageAssets';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data
    localStorage.removeItem('user');
    
    // Show logout message for 2 seconds then redirect to home
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Logged Out Successfully</h1>
          <p className="text-gray-600 mb-6">You have been logged out of your account.</p>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Go to Homepage
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Login Again
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Redirecting to homepage in a moment...
          </p>
        </div>
      </div>
    </div>
  );
}
