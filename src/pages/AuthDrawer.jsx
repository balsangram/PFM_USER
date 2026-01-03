// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { API_CONFIG } from '../config/api.config';

// export default function AuthDrawer({ open, onClose, onLoginSuccess }) {
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpUserId, setOtpUserId] = useState('');
//   const otpRefs = useRef([]);

//   const sendOtp = async () => {
//     if (!phone || phone.length < 10) {
//       toast.error('Enter valid phone');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${API_CONFIG.BASE_URL}/customer/send-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone }),
//       });
//       const ct = res.headers.get('content-type') || '';
//       const data = ct.includes('application/json') ? await res.json() : { success: false, message: await res.text() };
//       if (!res.ok || !data.success) throw new Error(data.message || 'Failed');
//       const uid = (data.data && (data.data.userId || data.data.id)) || '';
//       setOtpUserId(uid);
//       setOtpSent(true);
//       toast.success('OTP sent');
//     } catch (e) {
//       toast.error(e.message || 'Failed to send OTP');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otpUserId) {
//       toast.error('Request OTP again');
//       return;
//     }
//     if (!otp || otp.length !== 4) {
//       toast.error('Enter 4 digit OTP');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${API_CONFIG.BASE_URL}/customer/verify-login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone, otp, userId: otpUserId }),
//       });
//       const ct = res.headers.get('content-type') || '';
//       const data = ct.includes('application/json') ? await res.json() : { success: false, message: await res.text() };
//       if (!res.ok || !data.success) throw new Error(data.message || 'Invalid OTP');
//       // Extract payload
//       const payload = data?.data || {};
//       const apiUser = payload.user || {};
//       const accessToken = payload.accessToken || '';
//       const refreshToken = payload.refreshToken || '';
//       const resolvedUserId = apiUser.id || apiUser._id || otpUserId;

//       // Build canonical user record
//       const userRecord = {
//         ...apiUser,
//         id: resolvedUserId,
//         _id: resolvedUserId,
//         phone: apiUser.phone || phone,
//         role: apiUser.role || 'customer',
//         loginTime: new Date().toISOString(),
//         isLoggedIn: true
//       };

//       // Persist for subsequent API calls and userId resolution
//       localStorage.setItem('user', JSON.stringify(userRecord));
//       localStorage.setItem('customerId', resolvedUserId);
//       if (accessToken) {
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('customerAccessToken', accessToken);
//       }
//       if (refreshToken) {
//         localStorage.setItem('refreshToken', refreshToken);
//         localStorage.setItem('customerRefreshToken', refreshToken);
//       }

//       toast.success('Welcome! You are now logged in.');
//       onClose();
//       if (onLoginSuccess) onLoginSuccess();
//       // Redirect home after login
//       navigate('/', { replace: true });
//     } catch (e) {
//       toast.error(e.message || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <>
//       <ToastContainer />
//       <div className="fixed inset-0 z-50">
//         <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//         <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl p-6 overflow-auto">
//           <div className="flex items-start justify-between">
//             <h2 className="text-xl font-bold">Sign In / Sign Up</h2>
//             <button onClick={onClose} className="text-gray-500">✕</button>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
//             <input
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full rounded-lg border px-3 py-2"
//               placeholder="Enter mobile number"
//             />

//             {!otpSent ? (
//               <button
//                 onClick={sendOtp}
//                 disabled={isLoading}
//                 className="mt-4 w-full rounded-full bg-red-500 py-2 text-white"
//               >
//                 {isLoading ? 'Sending...' : 'Proceed via OTP'}
//               </button>
//             ) : (
//               <>
//                 <div className="mt-4">
//                   <label className="block text-sm text-gray-600 mb-2">Enter OTP</label>
//                   <div className="flex gap-2">
//                     {[0, 1, 2, 3].map((i) => (
//                       <input
//                         key={i}
//                         ref={(el) => (otpRefs.current[i] = el)}
//                         maxLength={1}
//                         onChange={(e) => {
//                           const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
//                           const arr = otp.split('');
//                           arr[i] = v;
//                           const next = arr.join('');
//                           setOtp(next);
//                           if (v && i < 3) otpRefs.current[i + 1]?.focus();
//                         }}
//                         className="w-12 h-12 text-center border rounded-lg"
//                       />
//                     ))}
//                   </div>
//                   <button
//                     onClick={verifyOtp}
//                     disabled={isLoading}
//                     className="mt-4 w-full rounded-full bg-green-600 py-2 text-white"
//                   >
//                     {isLoading ? 'Verifying...' : 'Verify & Login'}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_CONFIG } from '../config/api.config';

export default function AuthDrawer({ open, onClose, onLoginSuccess }) {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpUserId, setOtpUserId] = useState('');

  const otpRefs = useRef([]);

  // ================= SEND OTP =================
  const sendOtp = async () => {
    if (!phone || phone.length !== 10) {
      toast.error('Enter valid mobile number');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/customer/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      const uid =
        data?.data?.userId ||
        data?.data?.id ||
        '';

      setOtpUserId(uid);
      setOtpSent(true);
      setOtp(['', '', '', '']);

      setTimeout(() => otpRefs.current[0]?.focus(), 100);
      toast.success('OTP sent successfully');
    } catch (err) {
      toast.error(err.message || 'OTP send failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    const otpValue = otp.join('');

    if (!otpUserId) {
      toast.error('Request OTP again');
      return;
    }

    if (otpValue.length !== 4) {
      toast.error('Enter 4 digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/customer/verify-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          otp: otpValue,
          userId: otpUserId,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid OTP');
      }

      const payload = data.data || {};
      const apiUser = payload.user || {};
      const accessToken = payload.accessToken || '';
      const refreshToken = payload.refreshToken || '';
      const resolvedUserId = apiUser._id || apiUser.id || otpUserId;

      const userRecord = {
        ...apiUser,
        _id: resolvedUserId,
        id: resolvedUserId,
        phone: apiUser.phone || phone,
        role: apiUser.role || 'customer',
        isLoggedIn: true,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('user', JSON.stringify(userRecord));
      localStorage.setItem('customerId', resolvedUserId);

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('customerAccessToken', accessToken);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('customerRefreshToken', refreshToken);
      }

      toast.success('Login successful 🎉');
      onClose();
      onLoginSuccess?.();
      navigate('/', { replace: true });

    } catch (err) {
      toast.error(err.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl p-6 overflow-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Sign In / Sign Up</h2>
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>

          <div className="mt-6">
            <label className="block text-sm text-gray-600 mb-2">
              Mobile Number
            </label>

            <input
              type="tel"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Enter mobile number"
              disabled={otpSent}
            />

            {!otpSent ? (
              <button
                onClick={sendOtp}
                disabled={isLoading}
                className="mt-4 w-full rounded-full bg-red-500 py-2 text-white"
              >
                {isLoading ? 'Sending...' : 'Proceed via OTP'}
              </button>
            ) : (
              <>
                <div className="mt-6">
                  <label className="block text-sm text-gray-600 mb-2">
                    Enter OTP
                  </label>

                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (otpRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (!val) return;

                          const newOtp = [...otp];
                          newOtp[i] = val;
                          setOtp(newOtp);

                          if (i < 3) otpRefs.current[i + 1]?.focus();
                        }}
                        className="w-12 h-12 border rounded-lg text-center text-lg"
                      />
                    ))}
                  </div>

                  <button
                    onClick={verifyOtp}
                    disabled={isLoading}
                    className="mt-4 w-full rounded-full bg-green-600 py-2 text-white"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
