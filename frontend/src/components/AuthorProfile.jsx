import { NavLink, Outlet } from "react-router";
import {
  pageWrapper,
  navLinkClass,
  navLinkActiveClass,
  divider,
} from "../styles/common";
import { useAuth } from "../stores/authStore";
import { useSettings } from "../stores/settingsStore";

function AuthorProfile() {
  const user = useAuth((state) => state.currentUser);
  const settings = useSettings((state) => state.settings);

  return (
    <div className={pageWrapper}>
      <div className="mb-8 rounded-lg bg-[#f5f5f7] p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0066cc]">Author Profile</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1d1d1f]">
          {settings.displayName || user?.displayName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Author"}
        </h1>
        {(settings.bio || user?.bio) && <p className="mt-3 max-w-3xl leading-7 text-[#424245]">{settings.bio || user.bio}</p>}
        {(settings.location || user?.location) && <p className="mt-2 text-sm text-[#6e6e73]">{settings.location || user.location}</p>}
      </div>
      
      {/* Author Navigation */}
      <div className="flex gap-6 mb-6">

        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive ? navLinkActiveClass : navLinkClass
          }
        >
          Write Article
        </NavLink>

      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />

    </div>
  );
}

export default AuthorProfile;
