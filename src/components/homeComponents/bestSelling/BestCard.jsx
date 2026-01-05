import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
    available,
    isCommingSoon
}) {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
        if (available && !isCommingSoon) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="w-64 flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="relative h-40 bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                {offerPercent > 0 && (
                    <div className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {offerPercent}% OFF
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                    {name}
                </h3>
                
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <span>{unit}</span>
                    {pieces && <span>• {pieces} pieces</span>}
                    {serves && <span>• Serves {serves}</span>}
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                        ₹{discountPrice}
                    </span>
                    {price > discountPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{price}
                        </span>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                        ⏱️ {deliveryTime}
                    </span>
                </div>

                {/* Quantity Controls & Add Button */}
                {isCommingSoon ? (
                    <button
                        disabled
                        className="w-full bg-gray-100 text-gray-400 rounded-lg py-2 text-sm font-medium"
                    >
                        Coming Soon
                    </button>
                ) : !available ? (
                    // Only show if explicitly not available
                    <div className="text-center">
                        <p className="text-xs text-gray-500">Currently unavailable</p>
                    </div>
                ) : quantity > 0 ? (
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg">
                        <button
                            onClick={handleDecrease}
                            className="p-2 rounded-l-lg hover:bg-gray-200 transition"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="font-semibold">{quantity}</span>
                        <button
                            onClick={handleIncrease}
                            className="p-2 rounded-r-lg hover:bg-gray-200 transition"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleIncrease}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-lg py-2 text-sm font-medium transition"
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
}

export default BestCard;