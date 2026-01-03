import React, { useState } from 'react';
import AuthDrawer from './AuthDrawer';

export default function Login() {
  const [open, setOpen] = useState(true);
  return (
    <div className="min-h-screen bg-gray-100">
      <AuthDrawer open={open} onClose={() => setOpen(false)} onLoginSuccess={() => setOpen(false)} />
      {!open && (
        <div className="max-w-md mx-auto py-24 text-center">
          <h1 className="text-xl font-semibold">Login required</h1>
          <button onClick={() => setOpen(true)} className="mt-4 rounded-full bg-red-500 text-white px-6 py-2">Open Login</button>
        </div>
      )}
    </div>
  );
}



