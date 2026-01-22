import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../api";
import { useNavigate } from "react-router-dom";

// ⭐ Mocktail recipes
export const MOCKTAIL_ITEMS = [
  {
    id: 301,
    tag: "MOCKTAILS",
    title: "Virgin Mojito",
    time: "8 mins",
    img: "/Images/virgin-mojito.jpg",
    href: "/drinks/virgin-mojito",
    rating: 4.7,
  },
  {
    id: 302,
    tag: "MOCKTAILS",
    title: "Strawberry Basil Cooler",
    time: "10 mins",
    img: "/Images/strawberry-basil-cooler.jpg",
    href: "/drinks/strawberry-basil-cooler",
    rating: 4.8,
  },
  {
    id: 303,
    tag: "MOCKTAILS",
    title: "Cucumber Mint Fizz",
    time: "7 mins",
    img: "/Images/cucumber-mint-fizz.jpg",
    href: "/drinks/cucumber-mint-fizz",
    rating: 4.6,
  },
  {
    id: 304,
    tag: "MOCKTAILS",
    title: "Tropical Sunrise Mocktail",
    time: "9 mins",
    img: "/Images/tropical-sunrise.jpg",
    href: "/drinks/tropical-sunrise-mocktail",
    rating: 4.9,
  },
  {
    id: 305,
    tag: "MOCKTAILS",
    title: "Raspberry Lemon Spritzer",
    time: "6 mins",
    img: "/Images/raspberry-lemon-spritzer.jpg",
    href: "/drinks/raspberry-lemon-spritzer",
    rating: 4.5,
  },
  {
    id: 306,
    tag: "MOCKTAILS",
    title: "Citrus Ginger Sparkler",
    time: "6 mins",
    img: "/Images/citrus-ginger-sparkler.jpg",
    href: "/drinks/citrus-ginger-sparkler",
    rating: 4.4,
  },
];

const Mocktails = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Load + sync favorites
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
              time: recipe.time,
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

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < Math.round(rating || 0) ? "on" : ""} />
    ));

  return (
    <section className="breakfast section-gap py-5 aboutus-page">
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold">Mocktail Recipes</h2>
        <h3 className="fs-5 fw-normal mt-3 px-2">
          All the flavour and fun, without the alcohol.
        </h3>
      </div>

      <div className="container px-4 bg-transparent">
        <div className="row g-5 justify-content-center">
          {MOCKTAIL_ITEMS.map((r) => (
            <div key={r.id} className="col-md-4 d-flex">
              <article
                className="wk-card bg-white shadow-sm rounded-4 overflow-hidden h-100"
                style={{ paddingBottom: "15px" }}
              >
                <a className="d-block position-relative" href={r.href}>
                  <img
                    src={r.img}
                    alt={r.title}
                    className="img-fluid w-100"
                    style={{
                      borderBottomLeftRadius: "0.5rem",
                      borderBottomRightRadius: "0.5rem",
                      height: "260px",
                      objectFit: "cover",
                    }}
                  />

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

                  <a href={r.href} className="text-decoration-none text-dark">
                    <h3 className="fw-bold h5 mb-2">{r.title}</h3>
                  </a>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small text-muted">
                      <FaRegClock className="me-1" />
                      {r.time}
                    </span>
                    <span className="text-warning">{renderStars(r.rating)}</span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
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

export default Mocktails;
