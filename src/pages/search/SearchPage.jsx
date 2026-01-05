import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubCategoriCard from "../../components/Card/SubCategoriCard";
import SearchCard from "../../components/Card/SearchCard";
import { customerApi } from "../../services/customerApi";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("q") || "";

    const customerId = localStorage.getItem("customerId");

    const [categories, setCategories] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

                const response = await customerApi.searchProducts(
                    searchText,
                    customerId
                );

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

    return (
        <div className="p-4 space-y-4">

            {/* ================= EMPTY SEARCH ================= */}
            {!searchText.trim() && (
                <>
                    <h2 className="text-sm font-semibold text-gray-700">
                        Shop by Category
                    </h2>

                    {loading && (
                        <div className="flex gap-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-28 h-32 bg-gray-100 animate-pulse rounded-xl"
                                />
                            ))}
                        </div>
                    )}

                    {!loading && categories.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <SubCategoriCard
                                    key={cat._id}
                                    id={cat._id}
                                    name={cat.name}
                                    image={
                                        cat.image ||
                                        "https://via.placeholder.com/120?text=No+Image"
                                    }
                                />
                            ))}
                        </div>
                    )}

                    {!loading && categories.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No categories available
                        </p>
                    )}
                </>
            )}

            {/* ================= SEARCH RESULTS ================= */}
            {searchText.trim() && (
                <>
                    <h2 className="text-sm font-semibold text-gray-700">
                        Results for “{searchText}”
                    </h2>

                    {!loading && results.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No items found
                        </p>
                    )}

                    {!loading && results.length > 0 && (
                        <div className="space-y-3">
                            {results.map((item) => (
                                <SearchCard
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    image={item.img}
                                    quantity={`${item.weight || ""}g`}
                                    price={Math.round(item.discountPrice || item.price)}
                                    count={item.count || 0}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default SearchPage;
