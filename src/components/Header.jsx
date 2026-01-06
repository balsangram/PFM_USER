import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLogo from "./Logo/AppLogo";
import { MapPin, Search, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";

import {
    getStoredLocation,
    fetchCurrentLocation,
    saveLocation,
} from "../utils/location";

import CategoriesCard from "../components/categories/CategoriesCard";
import LoginPopup from "../components/auth/LoginPopup";
import CartDetails from "../components/cart/CartDetails";
import { getLocalStorage } from "../services/local.service"; // Adjust the import path as needed

function Header() {
    const navigate = useNavigate();
    const routerLocation = useLocation();

    const [location, setLocation] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState(null); // Add state for user
    const [showProfileDropdown, setShowProfileDropdown] = useState(false); // Add state for profile dropdown

    const [openCategories, setOpenCategories] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    /* ================= USER CHECK ================= */
    useEffect(() => {
        const storedUser = getLocalStorage();
        setUser(storedUser);
    }, []);

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

    // When user clicks search box
    const handleSearchFocus = () => {
        if (routerLocation.pathname !== "/search") {
            navigate("/search");
        }
    };

    // When user types
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        navigate(`/search?q=${encodeURIComponent(value)}`, {
            replace: true, // prevents history spam
        });
    };

    /* ================= SYNC SEARCH FROM URL ================= */
    useEffect(() => {
        if (routerLocation.pathname !== "/search") return;

        const params = new URLSearchParams(routerLocation.search);
        setSearchText(params.get("q") || "");
    }, [routerLocation]);

    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        localStorage.removeItem("customer");
        setUser(null);
        setShowProfileDropdown(false);
        // Optionally navigate to home or login
        navigate("/");
    };

    /* ================= LOCK BODY SCROLL ================= */
    useEffect(() => {
        document.body.style.overflow =
            openCategories || openLogin || openCart ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openCategories, openLogin, openCart]);

    return (
        <>
            {/* ================= HEADER ================= */}
            <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 sm:gap-6">
                    {/* Logo */}
                    <div onClick={() => navigate("/")} className="cursor-pointer flex-shrink-0">
                        <AppLogo />
                    </div>

                    {/* Location - Hidden on very small screens for space */}
                    <div
                        onClick={() => navigate("/location/view")}
                        className="hidden sm:flex items-center gap-1 cursor-pointer text-sm hover:text-red-600 transition-colors duration-200"
                    >
                        <MapPin size={16} className="text-gray-500" />
                        <div>
                            <p className="font-semibold text-gray-900">
                                {location?.city || "Select Location"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {location ? "Delivering here" : "Choose delivery location"}
                            </p>
                        </div>
                    </div>

                    {/* Search - Full width on mobile */}
                    <div className="flex-1 relative min-w-0">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            value={searchText}
                            onFocus={handleSearchFocus}
                            onChange={handleSearchChange}
                            placeholder="Search for any delicious item"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        />
                    </div>

                    {/* Categories - Hidden on mobile, shown on sm+ */}
                    <button
                        onClick={() => setOpenCategories(true)}
                        className="hidden sm:block text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
                    >
                        Categories
                    </button>

                    {/* Right actions group - Compact on mobile */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        {/* Profile/Login Area */}
                        <div className="relative">
                            {user?.id ? (
                                // Logged in: Show user icon with dropdown
                                <>
                                    <button
                                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-600 transition-colors duration-200"
                                    >
                                        <User size={18} />
                                        <span className="hidden sm:inline">Profile</span>
                                        <ChevronDown
                                            size={14}
                                            className={`ml-0.5 sm:ml-1 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {showProfileDropdown && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 transition-all duration-200 scale-100 opacity-100">
                                            <button
                                                onClick={() => {
                                                    navigate("/profile"); // Adjust route as needed
                                                    setShowProfileDropdown(false);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
                                            >
                                                <User size={16} />
                                                Profile
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-3"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                // Not logged in: Show login button
                                <button
                                    onClick={() => setOpenLogin(true)}
                                    className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-600 transition-colors duration-200"
                                >
                                    <User size={18} />
                                    <span className="hidden sm:inline">Login</span>
                                </button>
                            )}
                        </div>

                        {/* Cart */}
                        <button
                            onClick={() => setOpenCart(true)}
                            className="flex items-center gap-2 border border-red-500 text-red-500 px-3 py-1.5 rounded-full transition-all duration-200 hover:shadow-md hover:bg-red-50"
                        >
                            <ShoppingCart size={18} />
                            <div className="hidden sm:block text-xs leading-tight">
                                <p className="text-red-600">1 item</p>
                                <p className="font-semibold">₹199</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Location - Stacked below if needed, but for simplicity, show as badge or omit */}
                {!location && (
                    <div className="sm:hidden px-4 pb-2 text-xs text-gray-500 text-center">
                        Tap to select delivery location
                    </div>
                )}
            </header>

            {/* ================= POPUPS ================= */}
            {openCategories && (
                <CategoriesCard onClose={() => setOpenCategories(false)} />
            )}

            {openLogin && (
                <LoginPopup onClose={() => setOpenLogin(false)} />
            )}

            {openCart && (
                <CartDetails onClose={() => setOpenCart(false)} />
            )}
        </>
    );
}

export default Header;