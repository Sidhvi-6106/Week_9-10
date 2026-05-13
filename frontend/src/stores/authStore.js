import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  updateCurrentUser: (user) => set({ currentUser: user }),
  login: async (userCredObj) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post("https://blog-app-backend-hdx7.onrender.com/common-api/login", userCredObj, {
        withCredentials: true,
      });

      if (!res.data?.payload) {
        throw new Error(res.data?.error || res.data?.message || "Login failed");
      }

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
        error: null,
      });
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || err.message || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await axios.get("https://blog-app-backend-hdx7.onrender.com/common-api/logout", { withCredentials: true });

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },
  checkAuth: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get("https://blog-app-backend-hdx7.onrender.com/common-api/check-auth", { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
        return;
      }

      console.error("Auth check failed:", err);
      set({
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: err.response?.data?.message || "Unable to restore session",
      });
    }
  },
}));
