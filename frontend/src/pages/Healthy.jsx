import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../api";
import "../assets/Css/style.css";

const healthyRecipes = [
  {
    id: 8001,
    tag: "HEALTHY",
    title: "Cobb Salad",
    time: "15 mins",
    img: "/Images/Cobb Salad.webp",
    href: "/recipes/Cobb-Salad",
    rating: 4.7,
  },
  {
    id: 8002,
    tag: "HEALTHY",
    title: "The Simple Trick for Perfectly Grilled Chicken Breasts",
    time: "25 mins",
    img: "/Images/grilled-chicken.webp",
    href: "/recipes/grilled-chicken",
    rating: 4.6,
  },
  {
    id: 8003,
    tag: "HEALTHY",
    title: " Peach Cobbler Overnight Oats",
    time: "10 mins",
    img: "/Images/oatmeal-bowl.webp",
    href: "/recipes/oatmeal-bowl",
    rating: 4.8,
  },
  {
    id: 8004,
    tag: "HEALTHY",
    title: "My 1-Ingredient Upgrade for Better Baked Salmon",
    time: "35 mins",
    img: "/Images/baked-salmon.webp",
    href: "/recipes/baked-salmon",
    rating: 4.9,
  },
  {
    id: 8005,
    tag: "HEALTHY",
    title: " Sweet Potato Waffles with Fried Egg, Bacon, and Scallions",
    time: "30 mins",
    img: "/Images/Waffles.webp",
    href: "/recipes/Waffles.webp",
    rating: 4.9,
  },
  {
    id: 8006,
    tag: "HEALTHY",
    title: "Slow Cooker Chickpea Curry With Sweet Potatoes and Red Peppers",
    time: "20 mins",
    img: "/Images/chickpea.webp",
    href: "/recipes/chickpea",
    rating: 4.6,
  },
];

const Healthy = () => {
  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

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
        await API.delete(`/favorites/${recipe.id}`, {
          withCredentials: true,
        });
      } else {
        await API.post(
          "/favorites",
          {
            recipeId: recipe.id,
            recipe,
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
    <section className="section-gap py-5 aboutus-page">
      {/* 🔹 Minimal header */}
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold">Healthy Recipes</h2>
        <h3 className="fs-5 fw-normal mt-3 px-2">
          Nutritious, balanced and easy meals for a healthier lifestyle.
        </h3>
      </div>

      {/* 🔹 Cards */}
      <div className="container px-4 bg-transparent">
        <div className="row g-5 justify-content-center">
          {healthyRecipes.map((r) => (
            <div key={r.id} className="col-md-4 d-flex">
              <article className="wk-card bg-white shadow-sm rounded-4 overflow-hidden">
                <a className="d-block position-relative" href={r.href}>
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

                  <a href={r.href} className="text-decoration-none text-dark">
                    <h3 className="fw-bold h5 mb-2">{r.title}</h3>
                  </a>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small text-muted">
                      <FaRegClock className="me-1" />
                      {r.time}
                    </span>
                    <span className="text-warning">
                      {renderStars(r.rating)}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Login modal (same as others) */}
      <div
        className={`modal fade ${showLoginModal ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-hidden={!showLoginModal}
        style={
          showLoginModal ? { backgroundColor: "rgba(0,0,0,0.5)" } : {}
        }
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

export default Healthy;
