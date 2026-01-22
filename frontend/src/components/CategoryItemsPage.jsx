import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { FaRegClock, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

export default function CategoryItemsPage({ category, title, subtitle }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // favorites
  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  // load favorites on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("liked");
    if (stored) setLiked(JSON.parse(stored));
    if (!token) return;

    (async () => {
      try {
        const res = await API.get("/favorites", { withCredentials: true });
        const favs = res.data.favorites || [];
        const map = {};
        favs.forEach((r) => (map[r.id] = true));
        setLiked(map);
        localStorage.setItem("liked", JSON.stringify(map));
      } catch (e) {
        console.error("Failed to sync favorites:", e);
      }
    })();
  }, []);

  // fetch category items from DB
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await API.get("/category-items", { params: { category } });
        setItems(res.data.items || []);
      } catch (e) {
        console.error("Category fetch error:", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const handleToggleFavorite = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    // IMPORTANT:
    // For DB items, we use item.id as recipeId
    const recipeId = item.id;
    const wasLiked = !!liked[recipeId];

    setLiked((prev) => {
      const updated = { ...prev, [recipeId]: !wasLiked };
      localStorage.setItem("liked", JSON.stringify(updated));
      return updated;
    });

    try {
      if (wasLiked) {
        await API.delete(`/favorites/${recipeId}`, { withCredentials: true });
      } else {
        await API.post(
          "/favorites",
          {
            recipeId,
            recipe: {
              title: item.title,
              tag: item.tag,
              time: item.time_label,
              img: item.img_url,
              href: item.href,
              rating: item.rating || 0,
            },
          },
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.error("favorites sync error:", err);
      // revert
      setLiked((prev) => {
        const updated = { ...prev, [recipeId]: wasLiked };
        localStorage.setItem("liked", JSON.stringify(updated));
        return updated;
      });
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < Math.round(rating || 0) ? "on" : ""} />
    ));

  return (
    <section className="weeknights section-gap">
      <div className="wk-head" style={{ padding: "0 1rem" }}>
        <div>
          <h2 className="wk-title">{title || category}</h2>
          {subtitle ? <p style={{ marginTop: 6, opacity: 0.8 }}>{subtitle}</p> : null}
        </div>
      </div>

      {loading ? (
        <p style={{ padding: "1rem" }}>Loading…</p>
      ) : items.length === 0 ? (
        <p style={{ padding: "1rem" }}>No recipes yet.</p>
      ) : (
        <div className="wk-grid">
          {items.map((r) => (
            <article key={r.id} className="wk-card">
              <Link className="wk-thumb" to={r.href || "#"}>
                <img src={r.img_url} alt={r.title} />

                <button
                  type="button"
                  className={`wk-like ${liked[r.id] ? "is-liked" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleFavorite(r);
                  }}
                  aria-label={liked[r.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  {liked[r.id] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </Link>

              <div className="wk-body">
                <span className="wk-tag">{r.tag || category}</span>

                <Link className="wk-title-link" to={r.href || "#"}>
                  <h3 className="wk-h3">{r.title}</h3>
                </Link>

                <div className="wk-meta">
                  <span className="wk-time">
                    <FaRegClock /> {r.time_label || "—"}
                  </span>
                  <span className="wk-stars">{renderStars(r.rating)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Login modal */}
      <div
        className={`modal fade ${showLoginModal ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-hidden={!showLoginModal}
        style={showLoginModal ? { backgroundColor: "rgba(0,0,0,0.5)" } : {}}
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title">Sign in required</h5>
              <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)} />
            </div>
            <div className="modal-body">
              <p className="mb-0">Please log in to save favorites.</p>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowLoginModal(false)}>
                Close
              </button>
              <a href="/login" className="btn btn-primary">
                Go to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
