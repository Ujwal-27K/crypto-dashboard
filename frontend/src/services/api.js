import axios from "axios";
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
export const snippetAPI = {
  // Create new snippet
  createSnippet: async (snippetData) => {
    try {
      const response = await api.post("/snippets", snippetData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create snippet"
      );
    }
  },
  // Get snippet by ID
  getSnippet: async (id) => {
    try {
      const response = await api.get(`/snippets/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch snippet"
      );
    }
  },
  // Get recent snippets (optional)
  getRecentSnippets: async (limit = 10) => {
    try {
      const response = await api.get(`/snippets?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch recent snippets"
      );
    }
  },
};
export default api;
