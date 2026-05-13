import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../lib/api";
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
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      theme: settings.theme,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      displayName: user?.displayName || fullName,
      occupation: user?.occupation || "",
      website: user?.website || "",
      profileImageUrl: user?.profileImageUrl || "",
      bio: user?.bio || "",
      location: user?.location || "",
    },
  });

  useEffect(() => {
    const nextFullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

    reset({
      theme: settings.theme,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      displayName: user?.displayName || nextFullName,
      occupation: user?.occupation || "",
      website: user?.website || "",
      profileImageUrl: user?.profileImageUrl || "",
      bio: user?.bio || "",
      location: user?.location || "",
    });
  }, [reset, settings, user]);

  const saveSettings = async (data) => {
    updateSettings({ theme: data.theme });

    if (!isAuthenticated) {
      toast.success("Theme saved");
      return;
    }

    try {
      const res = await api.put("/common-api/profile", data);
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={formGroup}>
              <label className={labelClass}>First Name</label>
              <input className={inputClass} placeholder="First name" {...register("firstName", { required: true })} />
            </div>

            <div className={formGroup}>
              <label className={labelClass}>Last Name</label>
              <input className={inputClass} placeholder="Last name" {...register("lastName")} />
            </div>
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input type="email" className={inputClass} placeholder="you@example.com" {...register("email", { required: true })} />
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" className={inputClass} placeholder="+91 98765 43210" {...register("phoneNumber")} />
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Name</label>
            <input className={inputClass} placeholder="Your display name" {...register("displayName")} />
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Occupation</label>
            <input className={inputClass} placeholder="Student, developer, writer..." {...register("occupation")} />
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Website</label>
            <input type="url" className={inputClass} placeholder="https://example.com" {...register("website")} />
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Image URL</label>
            <input type="url" className={inputClass} placeholder="https://example.com/avatar.png" {...register("profileImageUrl")} />
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
