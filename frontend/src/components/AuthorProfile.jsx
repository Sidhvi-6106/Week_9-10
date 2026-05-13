import { NavLink, Outlet } from "react-router";
import {
  pageWrapper,
  navLinkClass,
  navLinkActiveClass,
  divider,
} from "../styles/common";
import { useAuth } from "../stores/authStore";

function AuthorProfile() {
  const user = useAuth((state) => state.currentUser);
  const profileName = user?.displayName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Author";

  return (
    <div className={pageWrapper}>
      <div className="mb-8 rounded-lg bg-(--surface-bg) p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-(--accent-color)">Author Profile</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--text-main)">
          {profileName}
        </h1>
        {user?.bio && <p className="mt-3 max-w-3xl leading-7 text-(--text-muted)">{user.bio}</p>}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-(--text-muted)">
          {user?.location && <span>{user.location}</span>}
          {user?.occupation && <span>{user.occupation}</span>}
          {user?.website && <a className="text-(--accent-color) hover:text-(--accent-hover)" href={user.website} target="_blank" rel="noreferrer">Website</a>}
        </div>
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
