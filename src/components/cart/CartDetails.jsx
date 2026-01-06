import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { customerApi } from "../../services/customerApi";
import CartCard from "../Card/CartCard";

function CartDetails({ onClose, lat, lng }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    /* ================= GET CUSTOMER ID ================= */
    const customerId = (() => {
        try {
            const raw = localStorage.getItem("user");
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            return parsed?.user?.id || parsed?.id || null;
        } catch {
            return null;
        }
    })();

    /* ================= FETCH CART ================= */
    const fetchCart = async () => {
        if (!customerId) return;

        try {
            setLoading(true);
            const res = await customerApi.checkProductInCart(
                customerId,
                lat,
                lng
            );

            setCartItems(Array.isArray(res?.data) ? res.data : []);
        } catch (err) {
            console.error("Cart fetch error:", err);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (customerId && lat && lng) fetchCart();
    }, [customerId, lat, lng]);

    /* ================= UPDATE QTY ================= */
    const updateQty = async (item, newCount) => {
        if (newCount < 1 || !customerId) return;

        try {
            await customerApi.updateCartItem(
                customerId,
                item.subCategoryId || item._id,
                newCount
            );
            fetchCart();
        } catch (err) {
            console.error("Update qty failed:", err);
        }
    };

    /* ================= BILL ================= */
    const deliveryCharge = cartItems.length ? 39 : 0;

    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.discountPrice ?? item.price ?? 0;
        return sum + price * item.count;
    }, 0);

    const total = subtotal + deliveryCharge;

    /* ================= UI ================= */
    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            <div className="relative ml-auto w-full sm:w-[420px] bg-white h-full flex flex-col shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Cart Items</h2>
                    <button onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {loading && (
                        <p className="text-sm text-gray-500">
                            Loading cart…
                        </p>
                    )}

                    {!loading && cartItems.length === 0 && (
                        <p className="text-sm text-gray-500 text-center">
                            Your cart is empty
                        </p>
                    )}

                    {cartItems.map((item) => (
                        <CartCard
                            key={item._id}
                            item={item}
                            onIncrease={() =>
                                updateQty(item, item.count + 1)
                            }
                            onDecrease={() =>
                                updateQty(item, item.count - 1)
                            }
                        />
                    ))}

                    {/* Bill */}
                    {cartItems.length > 0 && (
                        <div className="border rounded-lg p-3 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>₹{deliveryCharge}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-2">
                                <span>Total</span>
                                <span className="text-red-600">
                                    ₹{total}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t p-4">
                    <button
                        disabled={!cartItems.length}
                        className="w-full bg-red-600 text-white py-2 rounded-md font-semibold disabled:bg-gray-300"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;
