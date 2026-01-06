import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Zap, ArrowLeft, Plus, Minus } from "lucide-react";
import { customerApi } from "../../services/customerApi";

function CardFullDetails() {
  const { id } = useParams(); // subCategoryId
  const navigate = useNavigate();

  const customerId = localStorage.getItem("customerId");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  /* ================= FETCH DETAILS ================= */
  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await customerApi.getSubProductFullDetails(id);

        if (response?.data) {
          setProduct(response.data);
          // ✅ Sync cart count from backend
          setCount(Number(response.data.count || 0));
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        console.error("Product details error:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  /* ================= CART HANDLERS ================= */
  const handleAdd = async () => {
    if (!customerId) return alert("Please login to continue");

    try {
      setCartLoading(true);
      await customerApi.addToCart(product._id, 1);
      setCount(1);
    } finally {
      setCartLoading(false);
    }
  };

  const handleIncrease = async () => {
    try {
      setCartLoading(true);
      const newCount = count + 1;
      await customerApi.updateCartItem(product._id, newCount);
      setCount(newCount);
    } finally {
      setCartLoading(false);
    }
  };

  const handleDecrease = async () => {
    try {
      setCartLoading(true);
      const newCount = count - 1;

      if (newCount <= 0) {
        await customerApi.deleteCartItem(product._id);
        setCount(0);
      } else {
        await customerApi.updateCartItem(product._id, newCount);
        setCount(newCount);
      }
    } finally {
      setCartLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <div className="h-80 bg-gray-100 animate-pulse rounded-xl" />
        <div className="h-6 bg-gray-100 animate-pulse w-3/4" />
        <div className="h-4 bg-gray-100 animate-pulse w-full" />
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ================= DATA ================= */
  const {
    name,
    description,
    img,
    weight,
    unit,
    pieces,
    serves,
    price,
    discountPrice,
    quality,
    totalEnergy,
    protein,
    fat,
    carbohydrate,
  } = product;

  const discountPercent =
    price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-black font-medium"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <img
          src={img}
          alt={name}
          className="w-full h-80 object-cover rounded-2xl shadow-sm"
          onError={(e) => (e.currentTarget.src = "/no-image.png")}
        />

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>

          {quality && (
            <p className="text-sm italic text-gray-600">{quality}</p>
          )}

          <p className="text-gray-600">{description}</p>

          <p className="text-sm text-gray-500">
            {weight}
            {unit} | {pieces} Pieces | Serves {serves}
          </p>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Zap size={14} className="text-orange-500" />
            Delivery Today 7AM – 9AM
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₹{discountPrice}
            </span>
            {discountPercent > 0 && (
              <>
                <span className="text-lg line-through text-gray-400">
                  ₹{price}
                </span>
                <span className="text-green-600 font-semibold">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* ✅ ADD / QUANTITY CONTROLS */}
          {count > 0 ? (
            <div className="flex items-center justify-between border border-red-500 rounded-xl px-4 py-2">
              <button
                disabled={cartLoading}
                onClick={handleDecrease}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Minus size={20} />
              </button>

              <span className="text-lg font-semibold text-red-600">
                {count}
              </span>

              <button
                disabled={cartLoading}
                onClick={handleIncrease}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Plus size={20} />
              </button>
            </div>
          ) : (
            <button
              disabled={cartLoading}
              onClick={handleAdd}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition"
            >
              <Plus size={18} />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* NUTRITION */}
      {totalEnergy && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">
            Nutrition Facts (per serving)
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
            <div>
              <p className="font-medium">Energy</p>
              <p className="text-gray-600">{totalEnergy} kcal</p>
            </div>
            <div>
              <p className="font-medium">Protein</p>
              <p className="text-gray-600">{protein} g</p>
            </div>
            <div>
              <p className="font-medium">Fat</p>
              <p className="text-gray-600">{fat} g</p>
            </div>
            <div>
              <p className="font-medium">Carbs</p>
              <p className="text-gray-600">{carbohydrate} g</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardFullDetails;
