import React from "react";
import { X, Minus, Plus } from "lucide-react";

function CartDetails({ onClose }) {
    // Dummy cart data
    const cartItem = {
        name: "Chicken Mince (Keema)",
        weight: "450gms",
        price: 325,
        quantity: 2,
    };

    const deliveryCharge = 39;
    const subtotal = cartItem.price * cartItem.quantity;
    const total = subtotal + deliveryCharge;

    return (
        <div className="fixed inset-0 z-50 flex">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Right Drawer */}
            <div className="relative ml-auto w-full sm:w-[420px] bg-white h-full flex flex-col shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">
                        Order Summary
                    </h2>
                    <button onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                    {/* Cart Item */}
                    <div className="border rounded-lg p-3 flex justify-between items-start gap-3">
                        <div>
                            <h3 className="font-semibold text-sm">
                                {cartItem.name}
                            </h3>

                            <div className="flex items-center gap-2 mt-2">
                                <span className="border px-2 py-0.5 rounded text-xs">
                                    {cartItem.weight}
                                </span>
                                <span className="text-red-600 font-semibold text-sm">
                                    ₹{cartItem.price}
                                </span>
                            </div>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-2">
                            <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded">
                                <Minus size={14} />
                            </button>
                            <span className="text-sm font-semibold">
                                {cartItem.quantity}
                            </span>
                            <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-red-600">
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Bill Details */}
                    <div className="border border-dashed rounded-lg p-3 text-sm space-y-2">
                        <h4 className="font-semibold">
                            Bill Details
                        </h4>

                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                            <span>Delivery Charge</span>
                            <span>₹{deliveryCharge}</span>
                        </div>

                        <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total</span>
                            <span className="text-red-600">
                                ₹{total}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t p-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-semibold">
                            Total: ₹{total}
                        </p>
                    </div>

                    <button className="bg-red-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition">
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CartDetails;
