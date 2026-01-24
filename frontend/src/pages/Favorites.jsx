import { useEffect, useState } from "react";
import { FaRegClock, FaStar, FaHeart } from "react-icons/fa";
import useFavorites from "../hooks/useFavorites";
import API from "../api";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasToken = !!localStorage.getItem("token");

  // we use fetchFavorites to keep global liked map synced too
  const { fetchFavorites } = useFavorites();

  // Load favorites from DB
  useEffect(() => {
    if (!hasToken) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await API.get("/favorites", { withCredentials: true });
        setItems(res.data.favorites || []);
      } catch (err) {
        console.error("Failed to load favorites", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [hasToken]);

  const handleRemove = async (recipeId) => {
    // ✅ instant UI update
    setItems((prev) => prev.filter((x) => String(x.id) !== String(recipeId)));

    try {
      // ✅ backend delete
      await API.delete(`/favorites/${recipeId}`, { withCredentials: true });

      // ✅ re-sync liked map from DB (important for cross-device + other pages)
      await fetchFavorites();
    } catch (err) {
      console.error("Failed to remove favorite", err);

      // safest: refetch favorites list if delete failed
      try {
        const res = await API.get("/favorites", { withCredentials: true });
        setItems(res.data.favorites || []);
      } catch (e) {
        // ignore
      }
    }
  };

  if (!hasToken) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Your Favorites</h2>
        <p>Please log in to see your saved recipes.</p>
      </div>
    );
  }

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading favorites…</div>;
  }

  if (!items.length) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Your Favorites</h2>
        <p>You haven't saved any favorites yet. Tap the hearts on the pages.</p>
      </div>
    );
  }

  return (
    <section className="weeknights section-gap">
      <div className="wk-head">
        <h2 className="wk-title">Your Favorites</h2>
      </div>

      <div className="wk-grid">
        {items.map((r) => (
          <article key={r.id} className="wk-card">
            <a className="wk-thumb" href={r.href}>
              <img src={r.img} alt={r.title} />

              {/* ❤️ heart overlay */}
              <button
                type="button"
                className="wk-like is-liked"
                aria-label="Remove from favorites"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(r.id);
                }}
              >
                <FaHeart />
              </button>
            </a>

            <div className="wk-body">
              <span className="wk-tag">{r.tag}</span>
              <a className="wk-title-link" href={r.href}>
                <h3 className="wk-h3">{r.title}</h3>
              </a>

              <div className="wk-meta">
                <span className="wk-time">
                  <FaRegClock /> {r.time_label || r.time || "—"}
                </span>

                <span className="wk-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(Number(r.rating) || 0) ? "on" : ""}
                    />
                  ))}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
