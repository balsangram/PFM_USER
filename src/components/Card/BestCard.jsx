import React, { useState } from "react";
import { Plus, Minus, Zap } from "lucide-react";
import { customerApi } from "../../services/customerApi";
// import { customerApi } from "../../../services/customerApi";

function BestCard({
    id,
    name,
    image,
    unit,
    pieces,
    serves,
    price,
    discountPrice,
    offerPercent,
    deliveryTime,
    count: initialCount,
}) {
    const customerId = localStorage.getItem("customerId"); // adjust if needed
    const [count, setCount] = useState(initialCount || 0);
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        try {
            setLoading(true);
            await customerApi.addToCart(customerId, id);
            setCount(1);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (newCount) => {
        try {
            setLoading(true);

            if (newCount <= 0) {
                await customerApi.deleteCartItem(customerId, id);
                setCount(0);
            } else {
                await customerApi.updateCartItem(customerId, id, newCount);
                setCount(newCount);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-64 bg-white rounded-xl shadow-sm border">

            {/* Image */}
            <img
                src={image}
                alt={name}
                className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{name}</h3>

                <p className="text-xs text-gray-500">
                    {unit} | {pieces} Pieces | Serves {serves}
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹{discountPrice}</span>
                    {price > discountPrice && (
                        <span className="text-sm line-through text-gray-400">
                            ₹{price}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Zap size={14} className="text-orange-500" />
                    Delivery in {deliveryTime}
                </div>

                {/* ADD / QUANTITY CONTROLS */}
                {count === 0 ? (
                    <button
                        disabled={loading}
                        onClick={handleAdd}
                        className="w-full border border-red-500 text-red-500 rounded-md py-1.5 font-semibold"
                    >
                        ADD
                    </button>
                ) : (
                    <div className="flex items-center justify-between border border-red-500 rounded-md px-3 py-1">
                        <button
                            disabled={loading}
                            onClick={() => handleUpdate(count - 1)}
                        >
                            <Minus size={16} />
                        </button>

                        <span className="font-semibold">{count}</span>

                        <button
                            disabled={loading}
                            onClick={() => handleUpdate(count + 1)}
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BestCard;
