import React from "react";

function CardFullDetails({
    image,
    name,
    description,
    unit,
    pieces,
    serves,
    details,
    nutrition,
    marketedBy,
    address,
    fssaiLicense,
}) {
    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl border shadow-sm">

            {/* Image */}
            <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover rounded-t-xl"
            />

            {/* Content */}
            <div className="p-5 space-y-4">

                {/* Name */}
                <h1 className="text-xl font-semibold text-gray-900">
                    {name}
                </h1>

                {/* Description */}
                <p className="text-sm text-gray-600">
                    {description}
                </p>

                {/* Meta */}
                <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Unit:</strong> {unit}</p>
                    <p><strong>Pieces:</strong> {pieces}</p>
                    <p><strong>Serves:</strong> {serves}</p>
                </div>

                {/* Details */}
                <div>
                    <h2 className="font-semibold text-gray-900 mb-1">
                        Product Details
                    </h2>
                    <p className="text-sm text-gray-600">
                        {details}
                    </p>
                </div>

                {/* Nutrition */}
                <div>
                    <h2 className="font-semibold text-gray-900 mb-2">
                        Nutritional Information (Approx. per 100g)
                    </h2>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                        <p><strong>Total Energy:</strong> {nutrition.energy}</p>
                        <p><strong>Carbohydrate:</strong> {nutrition.carbohydrate}</p>
                        <p><strong>Fat:</strong> {nutrition.fat}</p>
                        <p><strong>Protein:</strong> {nutrition.protein}</p>
                    </div>
                </div>

                {/* Marketed By */}
                <div className="border-t pt-3 text-sm text-gray-700 space-y-1">
                    <p><strong>Marketed by:</strong> {marketedBy}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>FSSAI Lic No:</strong> {fssaiLicense}</p>
                </div>
            </div>
        </div>
    );
}

export default CardFullDetails;
