import React from "react";
import { useNavigate } from "react-router-dom";

function SearchCard({
    id, // ✅ subCardId
    image,
    name,
    quantity,
    price,
    onAdd,
}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/full-details/${id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="flex items-center gap-3 bg-white border rounded-lg p-3 hover:shadow-sm transition cursor-pointer"
        >
            {/* Image */}
            <img
                src={image}
                alt={name}
                className="w-14 h-14 object-cover rounded-md"
            />

            {/* Info */}
            <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {name}
                </h3>
                <p className="text-xs text-gray-500">
                    {quantity}
                </p>
            </div>

            {/* Price + Action */}
            <div className="text-right space-y-1">
                <p className="text-sm font-bold text-gray-900">
                    ₹{price}
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 🚫 prevent navigation
                        onAdd?.();
                    }}
                    className="text-xs border border-red-500 text-red-500 px-3 py-1 rounded-md font-semibold hover:bg-red-50 transition"
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default SearchCard;
