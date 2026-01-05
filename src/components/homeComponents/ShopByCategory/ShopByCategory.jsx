import React from "react";
import SubCategoriCard from "../../Card/SubCategoriCard";

function ShopByCategory() {
    const categories = [
        {
            id: "chicken",
            name: "Chicken",
            image: "https://images.unsplash.com/photo-1604908177522-040c5fdb6b89",
        },
        {
            id: "mutton",
            name: "Mutton",
            image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
        },
        {
            id: "fish",
            name: "Fish",
            image: "https://images.unsplash.com/photo-1617196031431-7db7c98a1b98",
        },
        {
            id: "prawns",
            name: "Prawns",
            image: "https://images.unsplash.com/photo-1625944525533-473f1a3b6e1d",
        },
    ];

    return (
        <div className="px-4 mt-6">
            <h1 className="text-lg font-semibold mb-4">
                Shop by Category
            </h1>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {categories.map((item) => (
                    <SubCategoriCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default ShopByCategory;
