import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLogo from "./Logo/AppLogo";
import { MapPin, Search, ShoppingCart, User } from "lucide-react";

import {
    getStoredLocation,
    fetchCurrentLocation,
    saveLocation,
} from "../utils/location";

import CategoriesCard from "../components/categories/CategoriesCard";
import LoginPopup from "../components/auth/LoginPopup";
import CartDetails from "../components/cart/CartDetails";

function Header() {
    const navigate = useNavigate();
    const routerLocation = useLocation();

    const [location, setLocation] = useState(null);
    const [searchText, setSearchText] = useState("");

    const [openCategories, setOpenCategories] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    /* ================= LOCATION ================= */
    useEffect(() => {
        const stored = getStoredLocation();
        if (stored) {
            setLocation(stored);
            return;
        }

        fetchCurrentLocation()
            .then((coords) => {
                const loc = {
                    city: "Current Location",
                    lat: coords.lat,
                    lng: coords.lng,
                };
                saveLocation(loc);
                setLocation(loc);
            })
            .catch(() => setLocation(null));
    }, []);

    /* ================= SEARCH ================= */
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        navigate(`/search?q=${encodeURIComponent(value)}`);
    };

    /* ================= SYNC SEARCH FROM URL ================= */
    useEffect(() => {
        const params = new URLSearchParams(routerLocation.search);
        const q = params.get("q") || "";
        setSearchText(q);
    }, [routerLocation.search]);

    /* ================= LOCK BODY SCROLL ================= */
    useEffect(() => {
        if (openCategories || openLogin || openCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openCategories, openLogin, openCart]);

    return (
        <>
            {/* ================= HEADER ================= */}
            <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">

                    {/* Logo */}
                    <div
                        onClick={() => navigate("/")}
                        className="cursor-pointer"
                    >
                        <AppLogo />
                    </div>

                    {/* Location */}
                    <div
                        onClick={() => navigate("/location/view")}
                        className="flex items-center gap-1 cursor-pointer text-sm hover:text-red-600"
                    >
                        <MapPin size={16} />
                        <div>
                            <p className="font-semibold">
                                {location?.city || "Select Location"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {location
                                    ? "Delivering here"
                                    : "Choose delivery location"}
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-2.5 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearch}
                            placeholder="Search for any delicious item"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-1 focus:ring-red-500"
                        />
                    </div>

                    {/* Menu */}
                    <nav className="flex gap-6 text-sm font-medium">
                        <button
                            onClick={() => setOpenCategories(true)}
                            className="hover:text-red-600"
                        >
                            Categories
                        </button>
                    </nav>

                    {/* Login */}
                    <button
                        onClick={() => setOpenLogin(true)}
                        className="flex items-center gap-1 hover:text-red-600"
                    >
                        <User size={18} />
                        Login
                    </button>

                    {/* Cart */}
                    <button
                        onClick={() => setOpenCart(true)}
                        className="flex items-center gap-2 border border-red-500 text-red-500 px-3 py-1.5 rounded"
                    >
                        <ShoppingCart size={18} />
                        <div>
                            <p className="text-xs">1 item</p>
                            <p className="font-semibold">₹199</p>
                        </div>
                    </button>
                </div>
            </header>

            {/* ================= POPUPS ================= */}

            {/* Categories */}
            {openCategories && (
                <CategoriesCard onClose={() => setOpenCategories(false)} />
            )}

            {/* Login */}
            {openLogin && (
                <LoginPopup onClose={() => setOpenLogin(false)} />
            )}

            {/* Cart Drawer */}
            {openCart && (
                <CartDetails onClose={() => setOpenCart(false)} />
            )}
        </>
    );
}

export default Header;
