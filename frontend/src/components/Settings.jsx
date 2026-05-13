import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../stores/authStore";
import { useSettings } from "../stores/settingsStore";
import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  pageWrapper,
  bodyText,
} from "../styles/common";

function Settings() {
  const user = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const updateCurrentUser = useAuth((state) => state.updateCurrentUser);
  const settings = useSettings((state) => state.settings);
  const updateSettings = useSettings((state) => state.updateSettings);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      theme: settings.theme,
      displayName: settings.displayName || user?.displayName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      bio: settings.bio || user?.bio || "",
      location: settings.location || user?.location || "",
    },
  });

  useEffect(() => {
    reset({
      theme: settings.theme,
      displayName: settings.displayName || user?.displayName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      bio: settings.bio || user?.bio || "",
      location: settings.location || user?.location || "",
    });
  }, [reset, settings, user]);

  const saveSettings = async (data) => {
    updateSettings(data);

    if (!isAuthenticated) {
      toast.success("Theme saved");
      return;
    }

    try {
      const res = await axios.put("http://localhost:4000/common-api/profile", data, { withCredentials: true });
      updateCurrentUser(res.data.payload);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to save profile settings");
    }
  };

  return (
    <div className={pageWrapper}>
      <div className={formCard}>
        <h2 className={formTitle}>Settings</h2>
        <p className={`${bodyText} mb-8 text-center`}>
          Update your reading theme and the profile details shown inside this browser.
        </p>

        <form onSubmit={handleSubmit(saveSettings)}>
          <div className={formGroup}>
            <label className={labelClass}>Theme</label>
            <select className={inputClass} {...register("theme")}>
              <option value="light">Light</option>
              <option value="warm">Warm</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Name</label>
            <input className={inputClass} placeholder="Your display name" {...register("displayName")} />
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Details</label>
            <textarea rows="4" className={inputClass} placeholder="Short bio or reading interests" {...register("bio")} />
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Location</label>
            <input className={inputClass} placeholder="City or campus" {...register("location")} />
          </div>

          <button type="submit" className={submitBtn}>
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
