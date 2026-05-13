import { useAuth } from "../stores/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSettings } from "../stores/settingsStore";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
} from "../styles/common.js";

function UserProfile() {
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const settings = useSettings((state) => state.settings);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/user-api/articles", { withCredentials: true });

        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  const getAuthorName = (author) => {
    if (!author) return "Author";
    return `${author.firstName || ""} ${author.lastName || ""}`.trim() || author.email || "Author";
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      {error && <p className={errorClass}>{error}</p>}

      <div className="mb-8 rounded-lg bg-[#f5f5f7] p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#0066cc]">Reader Profile</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1d1d1f]">
          {settings.displayName || user?.displayName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Reader"}
        </h1>
        {(settings.bio || user?.bio) && <p className="mt-3 max-w-3xl leading-7 text-[#424245]">{settings.bio || user.bio}</p>}
        {(settings.location || user?.location) && <p className="mt-2 text-sm text-[#6e6e73]">{settings.location || user.location}</p>}
      </div>

      <div className="flex justify-end mb-6 mt-3">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className={articleGrid}>
        {articles.map((articleObj) => (
          <div className={articleCardClass} key={articleObj._id}>
            <div className="flex flex-col h-full">
              {/* Top Content */}
              <div>
                <p className={articleTitle}>{articleObj.title}</p>

                <p className="text-sm text-[#6e6e73]">By {getAuthorName(articleObj.author)}</p>

                <p>{articleObj.content.slice(0, 70)}...</p>

                <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
              </div>

              {/* Button at bottom */}
              <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => navigateToArticleByID(articleObj)}>
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
