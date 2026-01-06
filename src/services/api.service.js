import { API_CONFIG } from "../config/api.config.js";
import { getLocalStorage } from "./local.service.js";

class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  getAccessToken() {
    const auth = getLocalStorage();
    return auth?.token || null;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log("➡️ API URL:", url);

    const token = this.getAccessToken();

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      method: options.method || "GET",
      headers,
      body: options.body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json();
  }
}

export default new ApiClient();
