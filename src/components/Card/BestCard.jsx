import React from "react";
import { Plus, Minus, Zap } from "lucide-react";

function BestCard({
    name,
    image,
    unit,
    pieces,
    serves,
    price,
    discountPrice,
    offerPercent,
    deliveryTime,
}) {
    return (
        <div className="w-64 bg-white rounded-xl shadow-sm border hover:shadow-md transition">

            {/* Image */}
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-40 object-cover rounded-t-xl"
                />

                {offerPercent && (
                    <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        {offerPercent}% off
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">

                {/* Name */}
                <h3 className="font-semibold text-sm line-clamp-2">
                    {name}
                </h3>

                {/* Meta */}
                <p className="text-xs text-gray-500">
                    {unit} | {pieces} Pieces | Serves {serves}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        ₹{discountPrice}
                    </span>
                    {price && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{price}
                        </span>
                    )}
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Zap size={14} className="text-orange-500" />
                    Delivery in {deliveryTime}
                </div>

                {/* Add button */}
                <button className="w-full mt-2 border border-red-500 text-red-500 rounded-md py-1.5 font-semibold hover:bg-red-50">
                    Add
                </button>
            </div>
        </div>
    );
}

export default BestCard;
