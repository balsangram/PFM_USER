import React, { useState, useEffect } from "react";
import SubCategoriCard from "../../Card/SubCategoriCard";
import apiClient from "../../../services/api.service"; // Adjust path as needed (e.g., from your api.service)

function ShopByCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await apiClient.request("/products/allCategories");
                if (response.success && response.data && Array.isArray(response.data)) {
                    const mappedCategories = response.data.map(category => ({
                        id: category._id,
                        name: category.name,
                        image: category.img ? category.img.replace(/<|>/g, '') : 'https://via.placeholder.com/256x160?text=No+Image',
                    }));
                    setCategories(mappedCategories);
                } else {
                    throw new Error('No categories received from API');
                }
            } catch (err) {
                console.error('API Fetch Error:', err);
                setError(`Failed to load categories: ${err.message}`);
                setCategories([]); // No fallback; show empty state
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []); // Empty dependency: fetches once on mount

    if (loading) {
        return (
            <div className="px-4 mt-6">
                <h1 className="text-lg font-semibold mb-4">Shop by Category</h1>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {[...Array(8)].map((_, index) => ( // Approximate number based on API sample
                        <div key={index} className="w-32 h-32 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 mt-6">
            <h1 className="text-lg font-semibold mb-4">Shop by Category</h1>
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {error}
                    <button
                        onClick={() => window.location.reload()} // Simple retry
                        className="ml-2 underline hover:no-underline"
                    >
                        Retry
                    </button>
                </div>
            )}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {categories.length > 0 ? (
                    categories.map((item) => (
                        <SubCategoriCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                        />
                    ))
                ) : (
                    !loading && <p className="text-sm text-gray-500 text-center py-4 col-span-full">No categories available at the moment. Check back soon!</p>
                )}
            </div>
        </div>
    );
}

export default ShopByCategory;