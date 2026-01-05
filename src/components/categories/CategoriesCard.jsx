import React, { useEffect, useState } from "react";
import SubCategoriCard from "../Card/SubCategoriCard";
import { customerApi } from "../../services/customerApi";

function CategoriesCard({ onClose }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ================= FETCH CATEGORY TYPES ================= */
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await customerApi.getCategoryTypes();

                if (Array.isArray(response?.data)) {
                    setCategories(response.data);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.error("Categories fetch error:", err);
                setError("Failed to load categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white w-[30rem] max-w-3xl rounded-xl p-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold mb-4">
                    Shop by Category
                </h2>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-32 bg-gray-100 animate-pulse rounded-lg"
                            />
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}

                {/* Categories */}
                {!loading && categories.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {categories.map((item) => (
                            <SubCategoriCard
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                image={
                                    item.image ||
                                    item.img ||
                                    "/no-image.png"
                                }
                            />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && categories.length === 0 && !error && (
                    <p className="text-sm text-gray-500">
                        No categories available
                    </p>
                )}
            </div>
        </div>
    );
}

export default CategoriesCard;
