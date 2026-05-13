import { create } from "zustand";
import api from "../lib/api";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: true,
  isAuthenticated: Boolean(localStorage.getItem("authToken")),
  error: null,
  updateCurrentUser: (user) => set({ currentUser: user }),
  login: async (userCredObj) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/common-api/login", userCredObj);

      if (!res.data?.payload) {
        throw new Error(res.data?.error || res.data?.message || "Login failed");
      }

      if (res.data?.token) {
        localStorage.setItem("authToken", res.data.token);
      }

      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload,
        error: null,
      });
    } catch (err) {
      console.log("err is ", err);
      localStorage.removeItem("authToken");
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
      await api.get("/common-api/logout");
      localStorage.removeItem("authToken");

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: null,
      });
    } catch (err) {
      localStorage.removeItem("authToken");
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
      const res = await api.get("/common-api/check-auth");

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
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
