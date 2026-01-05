import React, { useState } from "react";
import { X } from "lucide-react";
import { customerApi } from "../../services/customerApi";

function LoginPopup({ onClose }) {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState("PHONE"); // PHONE | OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null);

    /* ================= SEND OTP ================= */
    const handleSendOtp = async () => {
        if (phone.length !== 10) {
            setError("Enter valid 10-digit mobile number");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await customerApi.sendOtp(phone);

            if (res?.success) {
                setUserId(res?.data?.userId || null);
                setStep("OTP");
            } else {
                setError("Failed to send OTP");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    /* ================= VERIFY OTP ================= */
    const handleVerifyOtp = async () => {
        if (otp.length !== 4) {
            setError("Enter valid OTP");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await customerApi.verifyOtp({
                phone,
                otp,
                userId,
            });

            if (res?.success) {
                // ✅ Save login
                localStorage.setItem("customerId", res.data._id);
                localStorage.setItem("customer", JSON.stringify(res.data));

                onClose();
                window.location.reload();
            } else {
                setError("Invalid OTP");
            }
        } catch (err) {
            console.error(err);
            setError("OTP verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex bg-black/40">
            {/* LEFT IMAGE */}
            <div className="hidden md:block w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1604908177522-040c5fdb6b89"
                    alt="Login Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-10 left-10 text-white">
                    <h1 className="text-4xl font-bold">Priya Fresh Meat</h1>
                    <p className="mt-2 text-lg">Fresh. Clean. Delivered.</p>
                </div>
            </div>

            {/* RIGHT FORM */}
            <div className="w-full md:w-1/2 bg-white relative p-8 overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                <div className="max-w-sm mx-auto mt-20 space-y-6">
                    <h2 className="text-2xl font-semibold">
                        {step === "PHONE" ? "Sign In / Sign Up" : "Enter OTP"}
                    </h2>

                    {/* PHONE INPUT */}
                    {step === "PHONE" && (
                        <input
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Mobile Number"
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500"
                        />
                    )}

                    {/* OTP INPUT */}
                    {step === "OTP" && (
                        <input
                            type="text"
                            maxLength={4}
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Enter OTP"
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500 text-center tracking-widest"
                        />
                    )}

                    {/* ERROR */}
                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    {/* ACTION BUTTON */}
                    {step === "PHONE" ? (
                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 disabled:bg-gray-300"
                        >
                            {loading ? "Sending OTP..." : "Proceed via OTP"}
                        </button>
                    ) : (
                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 disabled:bg-gray-300"
                        >
                            {loading ? "Verifying..." : "Verify & Continue"}
                        </button>
                    )}

                    {/* TERMS */}
                    <p className="text-xs text-gray-600">
                        By continuing, you agree to our{" "}
                        <span className="text-red-500 cursor-pointer">
                            terms & conditions
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPopup;
