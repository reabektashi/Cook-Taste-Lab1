import { useEffect, useState } from "react";
import { FaHeart, FaRegClock, FaStar } from "react-icons/fa";
import { loadFavorites, saveFavorites, toggleFavorite } from "../utils/favorites";
import "../assets/Css/style.css";

export default function Favorites() {
  // store as id->recipe map (same as Home)
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  const onToggle = (recipe) => {
    setFavorites((prev) => toggleFavorite(recipe.id, recipe, prev));
  };

  const favList = Object.values(favorites);

  return (
    <section className="weeknights section-gap" style={{ paddingTop: "2rem" }}>
      <div className="wk-head">
        <h2 className="wk-title">Favorite Recipes</h2>
        {favList.length > 0 && <span className="wk-more" aria-hidden>❤️</span>}
      </div>

      {favList.length === 0 ? (
        <div style={{ padding: "1rem 0" }}>
          <p>You haven’t added any favorites yet.</p>
          <a className="wk-more" href="/">← Back to Home</a>
        </div>
      ) : (
        <div className="wk-grid">
          {favList.map((r) => (
            <article key={r.id} className="wk-card">
              <a className="wk-thumb" href={r.href}>
                <img src={r.img} alt={r.title} />

                {/* Heart overlay — same look/size as Home */}
                <button
                  type="button"
                  className="wk-like is-liked"
                  aria-label="Remove from favorites"
                  title="Remove from favorites"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggle(r); // remove
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
                    <FaRegClock /> {r.time}
                  </span>

                  <span
                    className="wk-stars"
                    aria-label={`Rating ${r.rating} out of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(r.rating) ? "on" : ""}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
