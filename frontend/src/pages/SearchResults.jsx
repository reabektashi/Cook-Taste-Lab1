import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaRegClock, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import API from "../api";

export default function SearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const q = params.get("q") || "";
  const ingredients = params.get("ingredients") || ""; // ✅ NEW

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // favorites (same logic as your pages)
  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  // load + sync favorites
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

  const handleToggleFavorite = async (recipe) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const wasLiked = !!liked[recipe.id];

    setLiked((prev) => {
      const updated = { ...prev, [recipe.id]: !prev[recipe.id] };
      localStorage.setItem("liked", JSON.stringify(updated));
      return updated;
    });

    try {
      if (wasLiked) {
        await API.delete(`/favorites/${recipe.id}`, { withCredentials: true });
      } else {
        await API.post(
          "/favorites",
          {
            recipeId: recipe.id,
            recipe: {
              title: recipe.title,
              tag: recipe.tag,
              time: recipe.time_label, // IMPORTANT: DB uses time_label
              img: recipe.img,
              href: recipe.href,
              rating: recipe.rating,
            },
          },
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.error("favorites sync error:", err);
    }
  };

  // ✅ DB search (q OR ingredients)
  useEffect(() => {
    if (!q.trim() && !ingredients.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);

        // Ingredient search takes priority if present
        const { data } = ingredients.trim()
          ? await API.get("/recipes/by-ingredients", {
              params: { ingredients },
            })
          : await API.get("/recipes/search", {
              params: { q },
            });

        setResults(data.recipes || []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [q, ingredients]);

  return (
    <section className="weeknights section-gap">
      <div className="wk-head">
        <h2 className="wk-title">Search results</h2>
      </div>

      {!q.trim() && !ingredients.trim() ? (
        <p style={{ padding: "1rem" }}>Type a search or pick ingredients.</p>
      ) : loading ? (
        <p style={{ padding: "1rem" }}>Searching…</p>
      ) : results.length === 0 ? (
        <p style={{ padding: "1rem" }}>No items found.</p>
      ) : (
        <div className="wk-grid">
          {results.map((r) => (
            <article key={r.id} className="wk-card">
              <Link className="wk-thumb" to={r.href || "#"}>
                <img src={r.img} alt={r.title} />
              </Link>

              {/* ❤️ Heart */}
              <button
                type="button"
                className={`wk-like ${liked[r.id] ? "is-liked" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleFavorite(r);
                }}
                aria-label="Toggle favorite"
              >
                {liked[r.id] ? <FaHeart size={22} color="red" /> : <FaRegHeart size={22} />}
              </button>

              <div className="wk-body">
                <span className="wk-tag">{r.tag}</span>

                <Link className="wk-title-link" to={r.href || "#"}>
                  <h3 className="wk-h3">{r.title}</h3>
                </Link>

                <div className="wk-meta">
                  <span className="wk-time">
                    <FaRegClock /> {r.time_label || "—"}
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
      )}

      {/* Login modal (same as your pages) */}
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
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowLoginModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">Please log in to save favorites.</p>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowLoginModal(false)}
              >
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
