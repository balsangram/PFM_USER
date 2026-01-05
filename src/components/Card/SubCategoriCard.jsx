import React from "react";
import { useNavigate } from "react-router-dom";

function SubCategoriCard({ id, name, image }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/all-cards/${id}`)}
            className="flex flex-col items-center cursor-pointer group"
        >
            {/* Circular Image */}
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                        e.currentTarget.onerror = null; // 🔴 STOP infinite loop
                        e.currentTarget.src = "/no-image.png";
                    }}
                />

            </div>

            {/* Name */}
            <p className="mt-3 text-sm font-medium text-center leading-tight max-w-[110px]">
                {name}
            </p>
        </div>
    );
}

export default SubCategoriCard;
