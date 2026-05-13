import { create } from "zustand";

const defaultSettings = {
  theme: "light",
  displayName: "",
  bio: "",
  location: "",
};

const readSettings = () => {
  try {
    return { ...defaultSettings, ...JSON.parse(localStorage.getItem("blogSettings")) };
  } catch {
    return defaultSettings;
  }
};

export const useSettings = create((set, get) => ({
  settings: readSettings(),
  updateSettings: (nextSettings) => {
    const settings = { ...get().settings, ...nextSettings };
    localStorage.setItem("blogSettings", JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.theme;
    set({ settings });
  },
  applyTheme: () => {
    document.documentElement.dataset.theme = get().settings.theme;
  },
}));
