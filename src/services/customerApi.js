import apiClient from "./apiClient";

export const customerApi = {
    getAllCategories() {
        return apiClient.request("/customer/allCategories");
    },

    addToCart(userId, subCategoryId, count = 1) {
        return apiClient.request(`/cart/${userId}`, {
            method: "POST",
            body: JSON.stringify({ subCategoryId, count }),
        });
    },
};
