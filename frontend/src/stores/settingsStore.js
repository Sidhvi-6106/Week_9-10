import { create } from "zustand";

const defaultSettings = {
  theme: "light",
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
    const settings = { ...get().settings, theme: nextSettings.theme || get().settings.theme };
    localStorage.setItem("blogSettings", JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.theme;
    set({ settings });
  },
  applyTheme: () => {
    document.documentElement.dataset.theme = get().settings.theme;
  },
}));
