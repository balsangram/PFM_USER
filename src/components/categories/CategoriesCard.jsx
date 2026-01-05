import React from "react";
import SubCategoriCard from "../Card/SubCategoriCard";

function CategoriesCard({ onClose }) {
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
    ];

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white w-[90%] max-w-3xl rounded-xl p-4 relative"
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
        </div>
    );
}

export default CategoriesCard;
