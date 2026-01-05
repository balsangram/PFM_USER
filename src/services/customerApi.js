// services/customerApi.js
import apiClient from "./api.service";

export const customerApi = {
  getBestSellingProducts(userId) {
    return apiClient.request(
      `/products/bestSellingProducts?userId=${userId}`
    );
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
};
