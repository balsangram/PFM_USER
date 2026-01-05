import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllCategoriesCard from "../../../components/Card/AllCategoriesCard";
import { customerApi } from "../../../services/customerApi";

function AllCards() {
    const { id } = useParams(); // categoryId from URL
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
                        image: product.img
                            ? product.img.replace(/<|>/g, "")
                            : "/no-image.png",
                        gram: `${product.weight || ""}${product.unit || ""}`,
                        pieces: product.pieces || "N/A",
                        serves: product.serves || "N/A",
                        deliveryTime: "7AM - 9AM",
                        price: Math.round(product.discountPrice || product.price),
                        mrpPrice: Math.round(product.price),
                        discountPercent:
                            product.price > product.discountPrice
                                ? Math.round(
                                    ((product.price - product.discountPrice) / product.price) *
                                    100
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
        console.log("Add to cart:", productName, "ID:", productId);
    };

    /* ================= LOADING ================= */
    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-80 bg-gray-100 animate-pulse rounded-xl"
                        />
                    ))}
                </div>
            </div>
        );
    }

    /* ================= ERROR ================= */
    if (error) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 mt-8 text-red-600 text-sm">
                {error}
            </div>
        );
    }

    /* ================= UI ================= */
    return (
        <div className="w-full max-w-7xl mx-auto px-4 mt-8">
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {products.map((item) => (
                        <AllCategoriesCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            gram={item.gram}
                            pieces={item.pieces}
                            serves={item.serves}
                            deliveryTime={item.deliveryTime}
                            price={item.price}
                            mrpPrice={item.mrpPrice}
                            discountPercent={item.discountPercent}
                            image={item.image}
                            onAction={() =>
                                handleAddToCart(item.id, item.name)
                            }
                        />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 text-center py-10">
                    No products available in this category
                </p>
            )}
        </div>
    );
}

export default AllCards;
