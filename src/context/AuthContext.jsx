import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const userRaw = localStorage.getItem("user");
            const token =
                localStorage.getItem("accessToken") ||
                localStorage.getItem("customerAccessToken");

            if (userRaw && token) {
                setUser(JSON.parse(userRaw));
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("accessToken", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("customerAccessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
