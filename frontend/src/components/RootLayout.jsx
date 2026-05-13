import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../stores/authStore";
import { useSettings } from "../stores/settingsStore";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const applyTheme = useSettings((state) => state.applyTheme);

  useEffect(() => {
    checkAuth();
    applyTheme();
  }, [checkAuth, applyTheme]);
  return (
    <div className="bg-(--page-bg) min-h-screen">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
