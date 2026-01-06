import React from "react";
import { useNavigate } from "react-router-dom";

function SearchCard({
    id, // Product ID
    image,
    name,
    quantity,
    discountedPrice, // The final price to display
    originalPrice, // Original price for strikethrough
    discount = 0, // Discount percentage (e.g., 8 for 8%)
    count = 0, // Cart quantity
    onAdd, // Callback: onAdd(id, delta) where delta is +1, -1, or initial add (1)
    className = "",
}) {
    const navigate = useNavigate();
    const hasDiscount = !!discount && discount > 0;

    const handleCardClick = (e) => {
        // Prevent navigation if clicking buttons or quantity controls
        if (e.target.closest("button") || e.target.closest(".quantity-controls")) return;
        navigate(`/full-details/${id}`);
    };

    const handleQuantityChange = (delta) => {
        const newCount = Math.max(0, count + delta);
        onAdd?.(id, delta); // Pass delta (+1 or -1)
    };

    const handleAddClick = () => {
        if (count === 0) {
            onAdd?.(id, 1); // Initial add: delta = 1
        }
    };

    return (
        <div
            onClick={handleCardClick}
            className={`
                flex items-start gap-3
                bg-white
                border border-gray-200
                rounded-xl
                p-3 sm:p-4
                hover:shadow-md hover:border-gray-300
                transition-all duration-200
                cursor-pointer
                active:scale-[0.99]
                ${className}
            `}
        >
            {/* Image */}
            <img
                src={image}
                alt={name}
                className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                onError={(e) => {
                    // Fallback to placeholder on error (prevents console spam from repeated failures)
                    if (!e.target.src.includes("placeholder")) {
                        e.target.src = "https://via.placeholder.com/56x56?text=No+Image";
                    }
                }}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {name}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                    {quantity}
                </p>
                {count > 0 && (
                    <p className="text-xs text-green-600">
                        In cart: {count}
                    </p>
                )}
            </div>

            {/* Price + Discount + Action */}
            <div className="text-right space-y-1 flex-shrink-0">
                <div className="space-y-0.5">
                    <p className={`text-sm font-bold ${hasDiscount ? 'text-green-600' : 'text-gray-900'}`}>
                        ₹{Math.round(discountedPrice)}
                    </p>
                    {hasDiscount && originalPrice && (
                        <p className="text-xs text-gray-500 line-through">
                            ₹{Math.round(originalPrice)}
                        </p>
                    )}
                    {hasDiscount && (
                        <p className="text-xs text-green-600">
                            Save ₹{Math.round(originalPrice - discountedPrice)}
                        </p>
                    )}
                    {hasDiscount && (
                        <p className="text-xs text-red-500 font-medium">
                            {discount}% off
                        </p>
                    )}
                </div>
                <div className="flex flex-col items-end gap-1">
                    {count === 0 ? (
                        <button
                            onClick={handleAddClick}
                            className="text-xs px-3 py-1 rounded-md font-semibold border border-red-500 text-red-500 hover:bg-red-50 transition w-full"
                        >
                            ADD TO CART
                        </button>
                    ) : (
                        <div className="quantity-controls flex items-center gap-1 text-xs font-semibold border border-gray-300 rounded-md px-2 py-1 bg-gray-50">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 transition"
                            >
                                −
                            </button>
                            <span className="min-w-[20px] text-center">{count}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-200 transition"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchCard;