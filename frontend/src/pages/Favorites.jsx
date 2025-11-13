import { useEffect, useState } from "react";
import { FaRegClock, FaStar } from "react-icons/fa";
import { fetchFavorites } from "../utils/favoritesApi";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasToken = !!localStorage.getItem("token");

  useEffect(() => {
    if (!hasToken) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const favs = await fetchFavorites();
        setItems(favs);
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [hasToken]);

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
        <p>You haven't saved any favorites yet. Tap the hearts on the Home page.</p>
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
            </a>

            <div className="wk-body">
              <span className="wk-tag">{r.tag}</span>
              <a className="wk-title-link" href={r.href}>
                <h3 className="wk-h3">{r.title}</h3>
              </a>
              <div className="wk-meta">
                <span className="wk-time">
                  <FaRegClock /> {r.time_label || r.time}
                </span>
                <span className="wk-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(r.rating || 0) ? "on" : ""}
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
