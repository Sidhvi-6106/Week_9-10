import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://blog-app-backend-hdx7.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
