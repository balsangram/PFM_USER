import React from "react";
import { X } from "lucide-react";

function LoginPopup({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex bg-black/40">

            {/* LEFT IMAGE SECTION */}
            <div className="hidden md:block w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1604908177522-040c5fdb6b89"
                    alt="Login Banner"
                    className="w-full h-full object-cover"
                />

                {/* Brand Text */}
                <div className="absolute top-10 left-10 text-white">
                    <h1 className="text-4xl font-bold">Licious</h1>
                    <p className="mt-2 text-lg">
                        For the love of meat!
                    </p>
                </div>
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="w-full md:w-1/2 bg-white relative p-8 overflow-y-auto">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                {/* Form */}
                <div className="max-w-sm mx-auto mt-20 space-y-6">

                    <h2 className="text-2xl font-semibold">
                        Sign In / Sign Up
                    </h2>

                    {/* Mobile Input */}
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-red-500"
                    />

                    {/* Button */}
                    <button
                        disabled
                        className="w-full bg-gray-300 text-white py-3 rounded-md font-semibold cursor-not-allowed"
                    >
                        Proceed Via OTP
                    </button>

                    {/* Terms */}
                    <p className="text-xs text-gray-600">
                        By signing in you agree to our{" "}
                        <span className="text-red-500 cursor-pointer">
                            terms and conditions
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default LoginPopup;