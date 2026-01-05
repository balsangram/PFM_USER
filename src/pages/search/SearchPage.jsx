// SearchPage.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import SubCategoriCard from "../../components/Card/SubCategoriCard";
import SearchCard from "../../components/Card/SearchCard";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("q") || "";

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

    const searchResults = [
        {
            id: "1",
            name: "Chicken Breast Boneless",
            image: "https://images.unsplash.com/photo-1604908177522-040c5fdb6b89",
            quantity: "500g",
            price: 249,
        },
        {
            id: "2",
            name: "Mutton Curry Cut",
            image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
            quantity: "500g",
            price: 599,
        },
    ];

    return (
        <div className="p-4 space-y-4">

            {/* EMPTY SEARCH → CATEGORIES */}
            {searchText.trim() === "" && (
                <>
                    <h2 className="text-sm font-semibold text-gray-700">
                        Shop by Category
                    </h2>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {categories.map((item) => (
                            <SubCategoriCard key={item.id} {...item} />
                        ))}
                    </div>
                </>
            )}

            {/* SEARCH RESULTS */}
            {searchText.trim() !== "" && (
                <>
                    <h2 className="text-sm font-semibold text-gray-700">
                        Results for “{searchText}”
                    </h2>

                    <div className="space-y-3">
                        {searchResults.map((item) => (
                            <SearchCard
                                key={item.id}
                                {...item}
                                onAdd={() => console.log("Add to cart:", item.name)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchPage;
