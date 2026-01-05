import React from "react";
import { useNavigate } from "react-router-dom";

function SubCategoriCard({ id, name, image }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/all-cards/${id}`)}
            className="min-w-[120px] cursor-pointer text-center bg-white rounded-lg border hover:shadow-md transition"
        >
            <img
                src={image}
                alt={name}
                className="w-full h-24 object-cover rounded-t-lg"
            />
            <p className="text-sm font-medium py-2 truncate">
                {name}
            </p>
        </div>
    );
}

export default SubCategoriCard;
