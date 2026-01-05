import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllCategoriesCard from "../../../components/Card/AllCategoriesCard";
import { customerApi } from "../../../services/customerApi";

function AllCards() {
    const { id } = useParams(); // 👈 categoryId from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await customerApi.getSubProductsByCategory(id);

                if (Array.isArray(response?.data)) {
                    const mappedProducts = response.data.map((product) => ({
                        id: product._id,
                        name: product.name,
                        description: product.description,
                        image: product.img ? product.img.replace(/<|>/g, '') : 'https://via.placeholder.com/400x320?text=No+Image', // Clean URL and fallback
                        gram: `${product.weight || ""}${product.unit || ""}`,
                        pieces: product.pieces || "N/A",
                        serves: product.serves || "N/A",
                        deliveryTime: "7AM - 9AM",
                        price: Math.round(product.discountPrice || product.price),
                        mrpPrice: Math.round(product.price),
                        discountPercent:
                            product.price > product.discountPrice
                                ? Math.round(
                                    ((product.price - product.discountPrice) / product.price) * 100
                                )
                                : 0,
                    }));

                    setProducts(mappedProducts);
                } else {
                    throw new Error("Invalid API response");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSubProducts();
    }, [id]);

    const handleAddToCart = (productId, productName) => {
        // TODO: Integrate with actual add to cart API
        // e.g., customerApi.addToCart(userId, productId).then(() => alert('Added!'));
        console.log("Add to cart:", productName, "ID:", productId);
    };

    /* ================= LOADING ================= */
    if (loading) {
        return (
            <div className="p-4 space-y-4">
                {[1, 2, 3, 4].map((i) => ( // Increased for more realistic loading
                    <div
                        key={i}
                        className="h-32 bg-gray-100 animate-pulse rounded-xl"
                    />
                ))}
            </div>
        );
    }

    /* ================= ERROR ================= */
    if (error) {
        return (
            <div className="p-4 text-red-600 text-sm">
                {error}
            </div>
        );
    }

    /* ================= UI ================= */
    return (
        <div className="p-4 space-y-4">
            {products.length > 0 ? (
                products.map((item) => (
                    <AllCategoriesCard
                        key={item.id}
                        id={item.id} // 👈 Pass product ID for navigation
                        name={item.name}
                        description={item.description}
                        gram={item.gram}
                        pieces={item.pieces}
                        serves={item.serves}
                        deliveryTime={item.deliveryTime}
                        price={item.price}
                        mrpPrice={item.mrpPrice}
                        discountPercent={item.discountPercent}
                        image={item.image} // 👈 Pass image for card display
                        onAction={() => handleAddToCart(item.id, item.name)} // 👈 Pass add to cart handler with ID
                    />
                ))
            ) : (
                <p className="text-sm text-gray-500 text-center">
                    No products available in this category
                </p>
            )}
        </div>
    );
}

export default AllCards;