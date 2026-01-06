import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubCategoriCard from "../../components/Card/SubCategoriCard";
import SearchCard from "../../components/Card/SearchCard";
import { customerApi } from "../../services/customerApi";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("q") || "";

    const [customerId, setCustomerId] = useState(() => localStorage.getItem("customerId"));
    const [categories, setCategories] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* ================= HANDLE ADD TO CART ================= */
    const handleAddToCart = async (productId, quantity = 1) => {
        if (!customerId) {
            setError("Please log in to add items to your cart.");
            return;
        }

        try {
            setError(null);
            const response = await customerApi.addToCart(customerId, productId, quantity);

            setResults((prev) =>
                prev.map((item) =>
                    item._id === productId
                        ? { ...item, count: (item.count || 0) + quantity }
                        : item
                )
            );

            console.log("Item added to cart successfully:", response);
        } catch (err) {
            console.error("Add to cart error:", err);
            setError("Failed to add item to cart. Please try again.");
        }
    };

    /* ================= LOAD CUSTOMER ID ================= */
    useEffect(() => {
        const id = localStorage.getItem("customerId");
        setCustomerId(id);
    }, []);

    /* ================= EMPTY SEARCH → LOAD CATEGORIES ================= */
    useEffect(() => {
        if (searchText.trim()) return;

        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await customerApi.getAllCategories();

                if (Array.isArray(response?.data)) {
                    setCategories(response.data);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.error("Category fetch error:", err);
                setError("Failed to load categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [searchText]);

    /* ================= SEARCH RESULTS ================= */
    useEffect(() => {
        if (!searchText.trim()) {
            setResults([]);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await customerApi.searchProducts(searchText, customerId);

                if (Array.isArray(response?.data)) {
                    setResults(response.data);
                } else {
                    setResults([]);
                }
            } catch (err) {
                console.error("Search error:", err);
                setError("Failed to fetch search results");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchText, customerId]);

    /* ================= UI ================= */
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 space-y-6">

            {/* ================= EMPTY SEARCH ================= */}
            {!searchText.trim() && (
                <>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 px-2 sm:px-0">
                        Shop by Category
                    </h2>

                    {loading && (
                        <div
                            className="
                            grid
                            grid-cols-1         /* Mobile: 1 card per row */
                            sm:grid-cols-2      /* Small tablets: 2 cards per row */
                            md:grid-cols-3      /* Tablets: 3 cards per row */
                            lg:grid-cols-4      /* Laptops: 4 cards per row */
                            xl:grid-cols-6      /* Desktop: 6 cards per row */
                            gap-4 sm:gap-5 md:gap-6
                            px-2 sm:px-0
                        "
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="
                                        w-full 
                                        h-40 sm:h-44 md:h-48 
                                        bg-gray-100 
                                        animate-pulse 
                                        rounded-xl md:rounded-2xl
                                    "
                                />
                            ))}
                        </div>
                    )}

                    {!loading && categories.length > 0 && (
                        <div
                            className="
                            grid
                            grid-cols-1         /* Mobile: 1 card per row */
                            sm:grid-cols-2      /* Small tablets: 2 cards per row */
                            md:grid-cols-3      /* Tablets: 3 cards per row */
                            lg:grid-cols-4      /* Laptops: 4 cards per row */
                            xl:grid-cols-6      /* Desktop: 6 cards per row */
                            gap-4 sm:gap-5 md:gap-6
                            px-2 sm:px-0
                        "
                        >
                            {categories.map((cat) => (
                                <SubCategoriCard
                                    key={cat._id}
                                    id={cat._id}
                                    name={cat.name}
                                    image={cat.img || "https://via.placeholder.com/120x120?text=No+Image"}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    )}

                    {!loading && categories.length === 0 && (
                        <p className="text-sm text-gray-500 px-2 sm:px-0">
                            No categories available
                        </p>
                    )}
                </>
            )}

            {/* ================= SEARCH RESULTS ================= */}
            {searchText.trim() && (
                <>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 px-2 sm:px-0">
                        Results for "{searchText}"
                        {results.length > 0 && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                ({results.length} {results.length === 1 ? 'item' : 'items'})
                            </span>
                        )}
                    </h2>

                    {loading && (
                        <div className="
                            grid
                            grid-cols-1         /* Mobile: 1 card per row */
                            sm:grid-cols-2      /* Small tablets: 2 cards per row */
                            md:grid-cols-3      /* Tablets: 3 cards per row */
                            lg:grid-cols-4      /* Laptops: 4 cards per row */
                            xl:grid-cols-6      /* Desktop: 6 cards per row */
                            gap-4 sm:gap-5 md:gap-6
                            px-2 sm:px-0
                        ">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="
                                        w-full 
                                        h-20 sm:h-24 
                                        bg-gray-100 
                                        animate-pulse 
                                        rounded-lg md:rounded-xl
                                    "
                                />
                            ))}
                        </div>
                    )}

                    {!loading && results.length === 0 && (
                        <div className="text-center py-12 px-2">
                            <p className="text-gray-500 text-base">
                                No items found for "{searchText}"
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                                Try different keywords or browse categories
                            </p>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <div
                            className="
                                grid
                                grid-cols-2        /* ✅ ALWAYS 2 cards per row */
                                gap-4 sm:gap-5
                                px-2 sm:px-0
                            "
                        >
                            {results.map((item) => (
                                <SearchCard
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    image={item.img ? item.img.replace(/^<|>$/g, '') : "https://via.placeholder.com/56x56?text=No+Image"} // Clean URL if wrapped in <>
                                    quantity={`${item.weight || ""}g`}
                                    originalPrice={Math.round(item.price || 0)}
                                    discountedPrice={Math.round(item.discountPrice || item.price || 0)}
                                    discount={item.discount || 0}
                                    count={item.count || 0}
                                    onAdd={(id) => handleAddToCart(id)}
                                    className="w-full"
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {error && (
                <div className="
                    text-sm 
                    text-red-600 
                    bg-red-50 
                    p-3 sm:p-4 
                    rounded-md 
                    mx-2 sm:mx-0
                ">
                    {error}
                </div>
            )}
        </div>
    );
}

export default SearchPage;