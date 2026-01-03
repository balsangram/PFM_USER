import { API_CONFIG } from '../config/api.config.js'

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    // Resolve access token from localStorage (supports multiple common keys)
    let accessToken = null
    try {
      accessToken = localStorage.getItem('accessToken')
        || localStorage.getItem('token')
        || localStorage.getItem('customerAccessToken')
        || (() => {
          const raw = localStorage.getItem('user')
          if (!raw) return null
          const u = JSON.parse(raw)
          return (
            u?.accessToken || u?.token || u?.access_token || u?.tokens?.accessToken || null
          )
        })()
    } catch {}

    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Category APIs
  async getAllCategories() {
    return this.request('/customer/allCategories')
  }

  async getBestSellingProducts(userId = null) {
    const endpoint = userId 
      ? `/customer/bestSellingProducts/user/${userId}`
      : '/customer/bestSellingProducts'
    return this.request(endpoint)
  }

  async getCategorySubProducts(categoryId, userId = null) {
    const params = userId ? `?userId=${userId}` : ''
    return this.request(`/customer/allCategories-subProducts/${categoryId}${params}`)
  }

  async getCategoriesWithTypes() {
    return this.request('/customer/categories-types')
  }

  async getTypeCategoryProducts(typeCategoryId, userId = null) {
    const params = userId ? `?userId=${userId}` : ''
    return this.request(`/customer/type-categories-all-card/${typeCategoryId}${params}`)
  }

  async getSubCategoryDetails(subCategoryId) {
    return this.request(`/customer/full-details-of-sub-categorie-card/${subCategoryId}`)
  }

  async searchItems(query) {
    return this.request(`/customer/search-item?name=${encodeURIComponent(query)}`)
  }

  async getAllSubCategories(userId = null) {
    const params = userId ? `?userId=${userId}` : ''
    return this.request(`/customer/display-all-subcategory${params}`)
  }

  async getBottomSearchCategories() {
    return this.request('/customer/allCategories-search-bottom')
  }

  // Cart APIs
  async getCart(userId) {
    return this.request(`/customer/cart/${userId}`)
  }

  async addToCart(userId, subCategoryId, count = 1) {
    return this.request(`/customer/cart/${userId}` , {
      method: 'POST',
      body: JSON.stringify({ subCategoryId, count })
    })
  }

  async updateCartItem(userId, subCategoryId, count) {
    return this.request(`/customer/cart/${userId}/item/${subCategoryId}`, {
      method: 'PATCH',
      body: JSON.stringify({ count })
    })
  }

  async deleteCartItem(userId, subCategoryId) {
    return this.request(`/customer/cart/${userId}/item/${subCategoryId}`, {
      method: 'DELETE'
    })
  }

  async getCartTotals(userId) {
    return this.request(`/customer/cart-details/${userId}`)
  }

  // Profile API
  async getCustomerProfile(userId) {
    return this.request(`/customer/profile/${userId}`)
  }
}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService
