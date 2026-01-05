import React from "react";
import { Zap } from "lucide-react";

function AllCategoriesCard({
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
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden">

      {/* IMAGE AT TOP */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/no-image.png";
          }}
        />

        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* TEXT CONTENT AT BOTTOM */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
          {name}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          {description}
        </p>

        <p className="text-xs text-gray-500">
          {gram} • {pieces} Pieces • Serves {serves}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{price}
          </span>
          <span className="text-sm line-through text-gray-400">
            ₹{mrpPrice}
          </span>
          <span className="text-xs font-semibold text-green-600 ml-auto">
            Save ₹{mrpPrice - price}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Zap size={14} className="text-orange-500" />
          Delivery in {deliveryTime}
        </div>

        <button
          onClick={onAction}
          className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm font-semibold transition"
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default AllCategoriesCard;
