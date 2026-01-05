import React, { useState, useEffect } from "react";
import SubCategoriCard from "../../Card/SubCategoriCard";
import apiClient from "../../../services/api.service";

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

        if (response?.success && Array.isArray(response.data)) {
          const mapped = response.data.map((category) => ({
            id: category._id,
            name: category.name,
            image: category.img
              ? category.img.replace(/<|>/g, "")
              : "/no-image.png",
          }));
          setCategories(mapped);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">
        Shop by Category
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((item) => (
            <SubCategoriCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-sm text-gray-500 text-center py-6">
            No categories available at the moment.
          </p>
        )
      )}
    </div>
  );
}

export default ShopByCategory;
