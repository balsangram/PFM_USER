import React from "react";
import AllCategoriesCard from "../../../components/Card/AllCategoriesCard";

function AllCards() {
    const products = [
        {
            id: 1,
            name: "Chicken Breast Boneless",
            description: "Fresh, tender chicken breast perfect for grilling and frying.",
            gram: "500g",
            pieces: 4,
            serves: 2,
            deliveryTime: "30 mins",
            price: 249,
            mrpPrice: 299,
            discountPercent: 17,
        },
        {
            id: 2,
            name: "Mutton Curry Cut",
            description: "Premium quality mutton pieces for rich curry taste.",
            gram: "500g",
            pieces: 6,
            serves: 3,
            deliveryTime: "35 mins",
            price: 599,
            mrpPrice: 699,
            discountPercent: 14,
        },
    ];

    return (
        <div className="p-4 space-y-4">
            {products.map((item) => (
                <AllCategoriesCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    gram={item.gram}
                    pieces={item.pieces}
                    serves={item.serves}
                    deliveryTime={item.deliveryTime}
                    price={item.price}
                    mrpPrice={item.mrpPrice}
                    discountPercent={item.discountPercent}
                    onAction={() => console.log("Add to cart:", item.name)}
                />
            ))}
        </div>
    );
}

export default AllCards;
