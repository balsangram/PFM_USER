import React from "react";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AllCategoriesCard({
    id, // ✅ subCardId
    name,
    description,
    gram,
    pieces,
    serves,
    deliveryTime,
    price,
    mrpPrice,
    discountPercent,
    onAction,
    buttonText = "Add",
}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/full-details/${id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition flex gap-4 cursor-pointer"
        >
            {/* Left Content */}
            <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-sm text-gray-900">
                    {name}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2">
                    {description}
                </p>

                <p className="text-xs text-gray-500">
                    {gram} | {pieces} Pieces | Serves {serves}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Zap size={14} className="text-orange-500" />
                    Delivery in {deliveryTime}
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-bold text-gray-900">
                        ₹{price}
                    </span>

                    {mrpPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{mrpPrice}
                        </span>
                    )}

                    {discountPercent && (
                        <span className="text-xs text-green-600 font-semibold">
                            {discountPercent}% OFF
                        </span>
                    )}
                </div>
            </div>

            {/* Right Action */}
            <div className="flex items-end">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 🚫 prevent navigation
                        onAction?.();
                    }}
                    className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-50 transition"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default AllCategoriesCard;
