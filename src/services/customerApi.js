// services/customerApi.js
import apiClient from "./api.service";
import { getLocalStorage } from "./local.service";

const getCustomerId = () => {
    const user = getLocalStorage();
    return user?.id || null;
};

export const customerApi = {
    /* ================= PRODUCTS ================= */

    getBestSellingProducts() {
        const customerId = getCustomerId();
        const query = customerId ? `?userId=${customerId}` : "";
        return apiClient.request(`/products/bestSellingProducts${query}`);
    },

    getAllCategories() {
        return apiClient.request("/products/allCategories");
    },

    getSubProductsByCategory(categoryId) {
        const customerId = getCustomerId();

        return apiClient.request(
            `/products/allCategories-subProducts/${categoryId}?userId=${customerId}`
        );
    },


    getSubProductFullDetails(subCategoryId) {
        const customerId = getCustomerId();
        return apiClient.request(
            `/products/full-details-of-sub-categorie-card/${subCategoryId}?userId=${customerId}`
        );
    },

    searchProducts(name) {
        const customerId = getCustomerId();
        return apiClient.request(
            `/products/search-item?name=${encodeURIComponent(name)}&userId=${customerId || ""}`
        );
    },

    getCategoryTypes() {
        return apiClient.request("/products/categories-types");
    },

    /* ================= AUTH ================= */

    sendOtp(phone) {
        return apiClient.request("/customer/send-otp", {
            method: "POST",
            body: JSON.stringify({ phone }),
        });
    },

    verifyOtp({ phone, otp, userId }) {
        return apiClient.request("/customer/verify-login", {
            method: "POST",
            body: JSON.stringify({ phone, otp, userId }),
        });
    },

    /* ================= CART ================= */

    displayCart(subCategoryId, count = 1) {
        const customerId = getCustomerId();
        if (!customerId) throw new Error("User not logged in");

        return apiClient.request(`/cart/${customerId}`, {
            method: "GET",
            body: JSON.stringify({
                subCategoryId,
                count: Number(count),
            }),

        });
    },
    addToCart(subCategoryId, count = 1) {
        const customerId = getCustomerId();
        if (!customerId) throw new Error("User not logged in");

        return apiClient.request(`/cart/${customerId}`, {
            method: "POST",
            body: JSON.stringify({
                subCategoryId,
                count: Number(count),
            }),
        });
    },

    checkProductInCart(lat, lng) {
        const customerId = getCustomerId();
        if (!customerId) throw new Error("User not logged in");

        return apiClient.request(
            `/cart/check-product/${customerId}/${lat}/${lng}`
        );
    },

    updateCartItem(subCategoryId, count) {
        const customerId = getCustomerId();
        if (!customerId) throw new Error("User not logged in");

        if (Number(count) <= 0) {
            return this.deleteCartItem(subCategoryId);
        }

        return apiClient.request(
            `/cart/${customerId}/item/${subCategoryId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ count: Number(count) }),
            }
        );
    },

    deleteCartItem(subCategoryId) {
        const customerId = getCustomerId();
        if (!customerId) throw new Error("User not logged in");

        return apiClient.request(
            `/cart/${customerId}/item/${subCategoryId}`,
            { method: "DELETE" }
        );
    },

    displayAmountAndCounts() {
        const customerId = getCustomerId();
        if (!customerId) throw new Error("User not logged in");
        return apiClient.request(`/cart/details/${customerId}`);
    },

}