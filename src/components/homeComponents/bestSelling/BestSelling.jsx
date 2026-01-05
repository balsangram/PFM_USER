import React from "react";
import BestCard from "../../Card/BestCard";

function BestSelling() {
    const products = [
        {
            name: "Chicken Breast Boneless",
            image: "https://images.unsplash.com/photo-1604908177522-040c5fdb6b89",
            unit: "500g",
            pieces: 4,
            serves: 2,
            price: 299,
            discountPrice: 249,
            offerPercent: 17,
            deliveryTime: "30 mins",
        },
        {
            name: "Mutton Curry Cut",
            image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
            unit: "500g",
            pieces: 6,
            serves: 3,
            price: 699,
            discountPrice: 599,
            offerPercent: 14,
            deliveryTime: "35 mins",
        },
        {
            name: "Fish Fillet",
            image: "https://images.unsplash.com/photo-1604908554164-3b0a6b2c6f12",
            unit: "400g",
            pieces: 3,
            serves: 2,
            price: 399,
            discountPrice: 349,
            offerPercent: 13,
            deliveryTime: "25 mins",
        },
        {
            name: "Prawns Jumbo",
            image: "https://images.unsplash.com/photo-1625944525533-473f1a3b6e1d",
            unit: "300g",
            pieces: 10,
            serves: 2,
            price: 499,
            discountPrice: 429,
            offerPercent: 14,
            deliveryTime: "40 mins",
        },
    ];

    return (
        <div className="px-4 mt-6">
            <h2 className="text-lg font-semibold mb-3">Best Selling</h2>

            {/* Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {products.map((item, index) => (
                    <BestCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

export default BestSelling;
