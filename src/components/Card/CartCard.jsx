// components/Card/CartCard.jsx
import React from "react";
import { Minus, Plus } from "lucide-react";

function CartCard({ item, onIncrease, onDecrease }) {
    const price = item.discountPrice ?? item.price ?? 0;

    return (
        <div className="border rounded-lg p-3 flex justify-between items-center">
            {/* Left */}
            <div>
                <h3 className="font-semibold text-sm">
                    {item.name}
                </h3>

                <p className="text-xs text-gray-500">
                    {item.weight}
                    {item.unit || "g"}
                </p>

                <p className="text-red-600 font-semibold">
                    ₹{price}
                </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onDecrease}
                    disabled={item.count === 1}
                    className="w-7 h-7 bg-gray-100 rounded disabled:opacity-40"
                >
                    <Minus size={14} />
                </button>

                <span className="font-semibold">
                    {item.count}
                </span>

                <button
                    onClick={onIncrease}
                    className="w-7 h-7 bg-red-100 text-red-600 rounded"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
}

export default CartCard;
