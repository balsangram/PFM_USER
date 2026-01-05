import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Grid, Search, User } from "lucide-react";

function BottomBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm z-50">
            <div className="flex justify-around items-center h-14">

                <NavItem to="/" label="Home" icon={Home} />
                <NavItem to="/categories" label="Categories" icon={Grid} />
                <NavItem to="/search" label="Search" icon={Search} />
                <NavItem to="/account" label="Account" icon={User} />

            </div>
        </div>
    );
}

function NavItem({ to, icon: Icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs gap-1 ${isActive ? "text-green-600" : "text-gray-500"
                }`
            }
        >
            <Icon size={20} />
            <span>{label}</span>
        </NavLink>
    );
}

export default BottomBar;
