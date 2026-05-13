import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../stores/authStore";
import { toast } from "react-hot-toast";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const [article, setArticle] = useState(location.state || null);
  const [hasInitialArticle] = useState(Boolean(location.state));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      setLoading(!hasInitialArticle);

      try {
        const res = await axios.get(`http://localhost:4000/user-api/article/${id}`, { withCredentials: true });
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [hasInitialArticle, id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getPersonName = (person, fallback) => {
    if (!person) return fallback;
    return `${person.firstName || ""} ${person.lastName || ""}`.trim() || person.email || fallback;
  };

  const authorId = article?.author?._id || article?.author;
  const canManageArticle = user?.role === "AUTHOR" && authorId === user?._id;

  const deleteArticle = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/author-api/articles/${id}/status`,
        { isArticleActive: false },
        { withCredentials: true },
      );

      toast.success("Article deleted successfully");
      navigate("/author-profile");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete article");
    }
  };

  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`, { state: articleObj });
  };

  const goBackToArticles = () => {
    if (user?.role === "AUTHOR") {
      navigate("/author-profile/articles");
      return;
    }

    navigate("/user-profile");
  };

  const submitComment = async (event) => {
    event.preventDefault();
    if (!comment.trim()) return;

    setCommenting(true);
    try {
      const res = await axios.put(
        "http://localhost:4000/user-api/articles",
        { user: user._id, articleId: article._id, comment: comment.trim() },
        { withCredentials: true },
      );
      setArticle(res.data.payload);
      setComment("");
      toast.success("Comment added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to add comment");
    } finally {
      setCommenting(false);
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      <button
        type="button"
        onClick={goBackToArticles}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-semibold text-[var(--text-main)] transition hover:bg-[var(--surface-bg)]"
      >
        <span aria-hidden="true">&larr;</span>
        Back to Articles
      </button>

      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>
        <h1 className={articleMainTitle}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>By {getPersonName(article.author, "Author")}</div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      <div className={articleContent}>{article.content}</div>

      {canManageArticle && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>
          <button className={deleteBtn} onClick={deleteArticle}>
            Delete
          </button>
        </div>
      )}

      <section className="mt-12 border-t border-[var(--border-color)] pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-main)]">Comments</h2>
          <span className="text-sm text-[var(--text-soft)]">{article.comments?.length || 0} total</span>
        </div>

        {isAuthenticated && user?.role === "USER" && (
          <form onSubmit={submitComment} className="mb-8">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows="4"
              className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-main)] outline-none focus:border-[var(--accent-color)] focus:ring-2 focus:ring-blue-500/10"
              placeholder="Share your thoughts about this article"
            />
            <button
              type="submit"
              disabled={commenting}
              className="mt-3 rounded-full bg-[var(--accent-color)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {commenting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        )}

        <div className="space-y-4">
          {(article.comments || []).length === 0 && (
            <p className="text-sm text-[var(--text-soft)]">No comments yet. Be the first reader to respond.</p>
          )}

          {(article.comments || []).map((item) => (
            <div key={item._id} className="rounded-lg bg-[var(--surface-bg)] p-4">
              <p className="text-sm font-semibold text-[var(--text-main)]">{getPersonName(item.user, "Reader")}</p>
              <p className="mt-2 leading-7 text-[var(--text-muted)]">{item.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;
