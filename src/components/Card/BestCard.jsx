import React, { useState } from "react";
import { Plus, Minus, Zap, ShoppingCart } from "lucide-react";
import { customerApi } from "../../services/customerApi";
import { useNavigate } from "react-router-dom";

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
    const customerId = localStorage.getItem("customerId");
    const [count, setCount] = useState(initialCount || 0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            setLoading(true);
            await customerApi.addToCart(customerId, id);
            setCount(1);
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = async () => {
        try {
            setLoading(true);
            const newCount = count + 1;
            await customerApi.updateCartItem(customerId, id, newCount);
            setCount(newCount);
        } finally {
            setLoading(false);
        }
    };
    const handleCardClick = () => {
        console.log("hi");

        navigate(`/full-details/${id}`);
    };
    const handleDecrease = async () => {
        try {
            setLoading(true);
            const newCount = count - 1;

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
        <div onClick={handleCardClick} className="w-64 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden">

            {/* Image + Overlay */}
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-40 object-cover"
                />

                {/* Offer Badge */}
                {offerPercent > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {offerPercent}% OFF
                    </div>
                )}

                {/* Quantity Control */}
                {/* Quantity Control */}
                <div className="absolute bottom-2 right-2" onClick={(e) => e.stopPropagation()}>
                    {count === 0 ? (
                        <button
                            disabled={loading}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAdd();
                            }}
                            className="bg-white text-red-600 border border-red-500 rounded-md p-2 shadow hover:bg-red-50 transition"
                        >
                            <Plus size={18} />
                        </button>
                    ) : (
                        <div className="flex items-center bg-white border border-red-500 rounded-md shadow overflow-hidden">
                            <button
                                disabled={loading}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecrease();
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 transition"
                            >
                                <Minus size={16} />
                            </button>

                            <span className="px-2 text-sm font-semibold text-red-600">
                                {count}
                            </span>

                            <button
                                disabled={loading}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncrease();
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 transition"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* Text Content BELOW image */}
            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">
                    {name}
                </h3>

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
                    {offerPercent > 0 && (
                        <span className="text-xs font-semibold text-green-600 ml-auto">
                            Save ₹{price - discountPrice}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Zap size={14} className="text-orange-500" />
                    Delivery in {deliveryTime}
                </div>
            </div>
        </div>
    );

}

export default BestCard;