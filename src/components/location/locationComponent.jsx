import React, { useEffect, useState } from "react";
import { fetchCurrentLocation, saveLocation } from "../utils/location";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LocationComponent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAutoDetect = async () => {
        try {
            setLoading(true);
            setError("");

            const coords = await fetchCurrentLocation();

            const locationData = {
                city: "Current Location",
                lat: coords.lat,
                lng: coords.lng,
            };

            saveLocation(locationData);
            navigate("/");
        } catch {
            setError("Location permission denied");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
                Select Delivery Location
            </h2>

            <button
                onClick={handleAutoDetect}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
                <MapPin size={18} />
                {loading ? "Detecting..." : "Use Current Location"}
            </button>

            {error && (
                <p className="text-sm text-red-500 mt-3 text-center">
                    {error}
                </p>
            )}

            <p className="text-xs text-gray-500 mt-4 text-center">
                You can continue browsing without location
            </p>
        </div>
    );
}

export default LocationComponent;
