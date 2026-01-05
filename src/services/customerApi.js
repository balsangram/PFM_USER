// services/customerApi.js
import apiClient from "./api.service";

export const customerApi = {
    getBestSellingProducts(userId) {
        const query = userId ? `?userId=${userId}` : "";
        return apiClient.request(`/products/bestSellingProducts${query}`);
    },
    addToCart(customerId, subCategoryId) {
        return apiClient.request(`/cart/${customerId}`, {
            method: "POST",
            body: JSON.stringify({ subCategoryId, count: 1 }),
        });
    },

    updateCartItem(customerId, subCategoryId, count) {
        if (count <= 0) {
            return this.deleteCartItem(customerId, subCategoryId);
        }

        return apiClient.request(
            `/cart/${customerId}/item/${subCategoryId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ count }),
            }
        );
    },

    deleteCartItem(customerId, subCategoryId) {
        return apiClient.request(
            `/cart/${customerId}/item/${subCategoryId}`,
            {
                method: "DELETE",
            }
        );
    },
    // In customerApi.js
    getAllCategories() {
        return apiClient.request("/products/allCategories");
    },
    getSubProductsByCategory(categoryId) {
        return apiClient.request(
            `/products/allCategories-subProducts/${categoryId}`
        );
    },
    // add this method at the bottom
    getSubProductFullDetails(subCategoryId) {
        return apiClient.request(
            `/products/full-details-of-sub-categorie-card/${subCategoryId}`
        );
    },
    searchProducts(name, userId) {
        return apiClient.request(
            `/products/search-item?name=${encodeURIComponent(name)}&userId=${userId}`
        );
    },
    getCategoryTypes() {
        return apiClient.request("/products/categories-types");
    },
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
}
