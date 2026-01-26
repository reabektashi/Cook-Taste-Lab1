import { useEffect, useState } from "react";
import { FaRegClock, FaStar, FaHeart } from "react-icons/fa";
import useFavorites from "../hooks/useFavorites";
import API from "../api";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasToken = !!localStorage.getItem("token");

  // keep global liked map in sync
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
    // instant UI update
    setItems((prev) => prev.filter((x) => String(x.id) !== String(recipeId)));

    try {
      await API.delete(`/favorites/${recipeId}`, { withCredentials: true });
      await fetchFavorites(); // resync liked map everywhere
    } catch (err) {
      console.error("Failed to remove favorite", err);

      // fallback: refetch
      try {
        const res = await API.get("/favorites", { withCredentials: true });
        setItems(res.data.favorites || []);
      } catch (_) {}
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

              {/* ❤️ remove favorite */}
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

                {/* ⭐ FIX: yellow stars */}
                <span className="wk-stars text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(Number(r.rating) || 0) ? "on" : ""
                      }
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
