import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import {
  navbarClass,
  navContainerClass,
  navLinksClass,
  navLinkClass,
  navLinkActiveClass,
} from "../styles/common";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getProfilePath = () => {
    if (!user) return "/";
    if (user.role === "AUTHOR") return "/author-profile";
    if (user.role === "ADMIN") return "/admin-dashboard";
    return "/user-profile";
  };

  const linkClass = ({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass);

  return (
    <nav className={navbarClass}>
      <div className={navContainerClass}>
        <NavLink to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#0066cc] text-lg font-bold text-white">
            B
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-[#1d1d1f] sm:inline">Blog App</span>
        </NavLink>

        <ul className={navLinksClass}>
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li>
                <NavLink to={getProfilePath()} className={linkClass}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className={linkClass}>
                  Settings
                </NavLink>
              </li>
              <li>
                <button className={navLinkClass} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
