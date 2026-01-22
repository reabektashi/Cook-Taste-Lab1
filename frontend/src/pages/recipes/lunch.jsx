import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../../api";

const Lunch = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // favorites UI state
  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 1) Load Lunch recipes from DB
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await API.get("/recipes", { params: { tag: "LUNCH" } });
        setItems(res.data?.recipes || []);
      } catch (err) {
        console.error("Failed to load LUNCH recipes:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) Load favorites (same as your other pages)
  useEffect(() => {
    const token = localStorage.getItem("token");

    // fast UI from local
    const stored = localStorage.getItem("liked");
    if (stored) setLiked(JSON.parse(stored));

    // sync from backend if logged in
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

    // optimistic UI
    setLiked((prev) => {
      const updated = { ...prev, [recipe.id]: !wasLiked };
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
              time: recipe.time_label || recipe.time,
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
      // revert on error
      setLiked((prev) => {
        const updated = { ...prev, [recipe.id]: wasLiked };
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
    <section className="lunch section-gap py-5 aboutus-page">
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold">Lunch Recipes</h2>
        <h3 className="fs-5 fw-normal mt-3 px-3">
          We know you need tasty, easy lunches to get you through your day. Browse pasta salads,
          quick soups, and sandwiches galore!
        </h3>
      </div>

      {loading ? (
        <p style={{ padding: "1rem", textAlign: "center" }}>Loading…</p>
      ) : items.length === 0 ? (
        <p style={{ padding: "1rem", textAlign: "center" }}>No lunch recipes yet.</p>
      ) : (
        <div className="container px-4 bg-transparent">
          <div className="row g-5 justify-content-center">
            {items.map((r) => (
              <div key={r.id} className="col-md-4 d-flex">
                <article
                  className="wk-card bg-white shadow-sm rounded-4 overflow-hidden"
                  style={{ paddingBottom: "15px" }}
                >
                  <a className="d-block position-relative" href={r.href || "#"}>
                    <img src={r.img} alt={r.title} className="img-fluid w-100" />

                    <button
                      type="button"
                      className={`wk-like position-absolute top-0 end-0 m-3 ${
                        liked[r.id] ? "is-liked text-danger" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleFavorite(r);
                      }}
                    >
                      {liked[r.id] ? (
                        <FaHeart size={28} color="red" />
                      ) : (
                        <FaRegHeart size={28} color="white" />
                      )}
                    </button>
                  </a>

                  <div className="p-3">
                    <span className="text-uppercase fw-semibold small text-muted d-block mb-1">
                      {r.tag}
                    </span>

                    <a href={r.href || "#"} className="text-decoration-none text-dark">
                      <h3 className="fw-bold h5 mb-2">{r.title}</h3>
                    </a>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-muted">
                        <FaRegClock className="me-1" />
                        {r.time_label || "—"}
                      </span>
                      <span className="text-warning">{renderStars(r.rating)}</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
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
};

export default Lunch;
