import { useAuth } from "../stores/authStore";
import { useNavigate } from "react-router";
import api from "../lib/api";
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
  const authLoading = useAuth((state) => state.loading);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const settings = useSettings((state) => state.settings);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (authLoading) return;

    const getArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get("/user-api/articles");

        setArticles(res.data.payload || []);
      } catch (err) {
        setArticles([]);
        setError(err.response?.data?.message || err.response?.data?.error || "Unable to load articles");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [authLoading, isAuthenticated]);

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
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

      <div className="mb-8 rounded-lg bg-(--surface-bg) p-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-(--accent-color)">Reader Profile</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-(--text-main)]">
          {settings.displayName || user?.displayName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Reader"}
        </h1>
        {(settings.bio || user?.bio) && <p className="mt-3 max-w-3xl leading-7 text-[var(--text-muted)]">{settings.bio || user.bio}</p>}
        {(settings.location || user?.location) && <p className="mt-2 text-sm text-[var(--text-muted)]">{settings.location || user.location}</p>}
      </div>

      <div className={articleGrid}>
        {articles.map((articleObj) => (
          <div className={articleCardClass} key={articleObj._id}>
            <div className="flex flex-col h-full">
              {/* Top Content */}
              <div>
                <p className={articleTitle}>{articleObj.title}</p>

                <p className="text-sm text-(--text-muted)">By {getAuthorName(articleObj.author)}</p>

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

      {!error && articles.length === 0 && (
        <p className="mt-8 rounded-lg bg-(--surface-bg) p-6 text-center text-(--text-muted)">
          No active articles are available to read right now.
        </p>
      )}
    </div>
  );
}

export default UserProfile;
