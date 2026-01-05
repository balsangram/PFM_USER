import { API_CONFIG } from "../config/api.config.js";

class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  getAccessToken() {
    try {
      return (
        localStorage.getItem("accessToken") ||
        localStorage.getItem("customerAccessToken") ||
        localStorage.getItem("token") ||
        (() => {
          const raw = localStorage.getItem("user");
          if (!raw) return null;
          const u = JSON.parse(raw);
          return u?.accessToken || u?.token || null;
        })()
      );
    } catch {
      return null;
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log("➡️ API URL:", url);

    const token = this.getAccessToken();

    const config = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      body: options.body,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json();
  }
}

export default new ApiClient();
