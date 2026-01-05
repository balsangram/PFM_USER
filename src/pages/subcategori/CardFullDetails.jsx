import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Zap, ArrowLeft, Plus } from "lucide-react";
import { customerApi } from "../../services/customerApi";

function CardFullDetails() {
    const { id } = useParams(); // subCategoryId
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                const response =
                    await customerApi.getSubProductFullDetails(id);

                if (response?.data) {
                    setProduct(response.data);
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

    /* ================= LOADING STATE ================= */
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-4">
                <div className="h-80 bg-gray-100 animate-pulse rounded-xl" />
                <div className="h-6 bg-gray-100 animate-pulse w-3/4" />
                <div className="h-4 bg-gray-100 animate-pulse w-full" />
            </div>
        );
    }

    /* ================= ERROR STATE ================= */
    if (error || !product) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <p className="text-red-600 mb-4">
                    {error || "Product not found"}
                </p>
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
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-black font-medium"
            >
                <ArrowLeft size={18} />
                Back
            </button>

            {/* MAIN SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* IMAGE */}
                <img
                    src={img}
                    alt={name}
                    className="w-full h-80 object-cover rounded-2xl shadow-sm"
                    onError={(e) =>
                    (e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=No+Image")
                    }
                />

                {/* DETAILS */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {name}
                    </h1>

                    {quality && (
                        <p className="text-sm italic text-gray-600">
                            {quality}
                        </p>
                    )}

                    <p className="text-gray-600 leading-relaxed">
                        {description}
                    </p>

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

                    {/* ADD TO CART */}
                    <button
                        className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition"
                        onClick={() =>
                            console.log("Add to cart:", product._id)
                        }
                    >
                        <Plus size={18} />
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* NUTRITION SECTION */}
            {totalEnergy && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">
                        Nutrition Facts (per serving)
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                        <div>
                            <p className="font-medium">Energy</p>
                            <p className="text-gray-600">
                                {totalEnergy} kcal
                            </p>
                        </div>
                        <div>
                            <p className="font-medium">Protein</p>
                            <p className="text-gray-600">
                                {protein} g
                            </p>
                        </div>
                        <div>
                            <p className="font-medium">Fat</p>
                            <p className="text-gray-600">
                                {fat} g
                            </p>
                        </div>
                        <div>
                            <p className="font-medium">Carbs</p>
                            <p className="text-gray-600">
                                {carbohydrate} g
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardFullDetails;
