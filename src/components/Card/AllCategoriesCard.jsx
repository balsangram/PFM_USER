import React from "react";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AllCategoriesCard({
    id,
    name,
    description,
    gram,
    pieces,
    serves,
    deliveryTime,
    price,
    mrpPrice,
    discountPercent,
    image,
    onAction,
}) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/full-details/${id}`)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer flex overflow-hidden"
        >
            {/* LEFT CONTENT */}
            <div className="flex-1 p-4 space-y-2">
                <h3 className="font-semibold text-base text-gray-900">
                    {name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {description}
                </p>

                <p className="text-xs text-gray-500">
                    {gram} | {pieces} Pieces | Serves {serves}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Zap size={14} className="text-orange-500" />
                    Today {deliveryTime}
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-gray-900">
                        ₹{price}
                    </span>

                    {mrpPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{mrpPrice}
                        </span>
                    )}

                    {discountPercent > 0 && (
                        <span className="text-xs text-green-600 font-semibold">
                            {discountPercent}% off
                        </span>
                    )}
                </div>
            </div>

            {/* RIGHT IMAGE + ACTION */}
            <div className="relative w-40 flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />

                {/* DISCOUNT BADGE */}
                {discountPercent > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        {discountPercent}% OFF
                    </span>
                )}

                {/* ADD BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAction?.();
                    }}
                    className="absolute bottom-2 right-2 bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-700 transition"
                >
                    Add +
                </button>
            </div>
        </div>
    );
}

export default AllCategoriesCard;
