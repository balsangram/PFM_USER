import React, { useState } from "react";
import { Zap, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { customerApi } from "../../services/customerApi";

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
}) {
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= NAVIGATION ================= */
  const handleCardClick = () => {
    navigate(`/full-details/${id}`);
  };

  /* ================= CART HANDLERS ================= */
  const handleAdd = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await customerApi.addToCart(customerId, id);
      setCount(1);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const newCount = count + 1;
      await customerApi.updateCartItem(customerId, id, newCount);
      setCount(newCount);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async (e) => {
    e.stopPropagation();
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
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover"
          onError={(e) => (e.currentTarget.src = "/no-image.png")}
        />

        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* CONTENT */}
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

        {/* ADD / QUANTITY CONTROLS */}
        <div onClick={(e) => e.stopPropagation()}>
          {count === 0 ? (
            <button
              disabled={loading}
              onClick={handleAdd}
              className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm font-semibold transition disabled:opacity-70"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center justify-between border border-red-500 rounded-lg px-4 py-1.5 mt-2">
              <button
                disabled={loading}
                onClick={handleDecrease}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Minus size={18} />
              </button>

              <span className="font-semibold text-red-600">
                {count}
              </span>

              <button
                disabled={loading}
                onClick={handleIncrease}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Plus size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCategoriesCard;
