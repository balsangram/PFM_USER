import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiService from '../services/api.service';

export default function Profile() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        // Try cached profile first
        const cached = localStorage.getItem('customerProfile');
        if (cached) {
          try { setProfile(JSON.parse(cached)); } catch {}
        }
        // Always refresh from API
        const userIdFromState = location?.state?.userId || null;
        const rawUser = localStorage.getItem('user');
        const parsed = (() => { try { return JSON.parse(rawUser) || {}; } catch { return {}; } })();
        const altUserRaw = localStorage.getItem('customer') || localStorage.getItem('profile') || null;
        const altUser = (() => { try { return altUserRaw ? JSON.parse(altUserRaw) : {}; } catch { return {}; } })();
        const storedCustomerId = localStorage.getItem('customerId') || null;
        const token = (localStorage.getItem('accessToken')
          || localStorage.getItem('token')
          || localStorage.getItem('customerAccessToken')) || null;
        const decoded = (() => {
          try {
            if (!token) return {};
            const payload = token.split('.')[1];
            if (!payload) return {};
            const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            return json || {};
          } catch { return {}; }
        })();
        const userId = userIdFromState
          || parsed._id || parsed.id
          || altUser._id || altUser.id
          || storedCustomerId
          || decoded.userId || decoded._id || decoded.id || decoded.uid
          || null;
        console.log("userId", userId);
        
        if (userId) {
          const res = await apiService.getCustomerProfile(userId);
          console.log("res", res);
          
          const data = res?.data || res;
          setProfile(data);
          localStorage.setItem('customerProfile', JSON.stringify(data));
        }
      } catch (e) {
        setError(e.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Account</h1>
          {loading && <div className="text-sm text-gray-500">Loading profile...</div>}
          {error && <div className="mb-4 rounded bg-red-50 text-red-700 text-sm p-3">{error}</div>}
          
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your full name"
                    defaultValue={profile?.name || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your phone number"
                    defaultValue={profile?.phone || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your email"
                    defaultValue={profile?.email || ''}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
