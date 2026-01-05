import React, { useState, useEffect } from "react";
import BestCard from "../../Card/BestCard";
import { customerApi } from "../../../services/customerApi";

function BestSelling() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBestSellingProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await customerApi.getBestSellingProducts();

                if (Array.isArray(response?.data)) {
                    const mappedProducts = response.data
                        .filter(product => product.bestSellers === true) // ✅ FIX
                        .map(product => ({
                            id: product._id,
                            name: product.name,
                            image:
                                product.img ||
                                "https://via.placeholder.com/256x160?text=No+Image",
                            unit: product.unit || "N/A",
                            pieces: product.pieces || "N/A",
                            serves: product.serves || "N/A",
                            price: Math.round(product.price || 0),
                            discountPrice: Math.round(product.discountPrice || 0),
                            offerPercent:
                                product.price > 0
                                    ? Math.round(
                                        ((product.price - product.discountPrice) /
                                            product.price) *
                                        100
                                    )
                                    : 0,
                            deliveryTime: "30 mins",
                            available: product.available,
                            isCommingSoon: product.isCommingSoon,
                        }));

                    setProducts(mappedProducts);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load best-selling products");
            } finally {
                setLoading(false);
            }
        };

        fetchBestSellingProducts();
    }, []);


    /* ================= LOADING ================= */

    if (loading) {
        return (
            <div className="px-4 mt-6">
                <h2 className="text-lg font-semibold mb-3">Best Selling</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="w-64 h-80 bg-gray-100 animate-pulse rounded-xl border"
                        />
                    ))}
                </div>
            </div>
        );
    }

    /* ================= UI ================= */

    return (
        <div className="px-4 mt-6">
            <h2 className="text-lg font-semibold mb-3">Best Selling</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {error}
                    <button
                        disabled={!available || isCommingSoon}
                        className={`w-full mt-2 rounded-md py-1.5 font-semibold transition
    ${!available || isCommingSoon
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "border border-red-500 text-red-500 hover:bg-red-50"
                            }`}
                    >
                        {isCommingSoon
                            ? "Coming Soon"
                            : !available
                                ? "Out of Stock"
                                : "Add"}
                    </button>

                </div>
            )}

            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {products.length > 0 ? (
                    products.map((item) => (
                        <BestCard key={item.id} {...item} />
                    ))
                ) : (
                    <p className="text-sm text-gray-500 py-4">
                        No best-selling products available.
                    </p>
                )}
            </div>
        </div>
    );
}

export default BestSelling;
