import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../api";
import "../assets/Css/style.css";

const quickEasyRecipes = [
  {
    id: 60011,
    tag: "QUICK & EASY",
    title: "The Cheap, Nutritious Breakfast I Make All the Time (It Takes 5 Minutes)",
    time: "5 mins",
    img: "/Images/avocado-toast.webp",
    href: "/recipes/avocado-toast",
    rating: 4.8,
  },
  {
    id: 60022,
    tag: "QUICK & EASY",
    title: "Creamy Lemon Pasta",
    time: "20 mins",
    img: "/Images/Creamy-Lemon-Pasta.webp",
    href: "/recipes/creamy-lemon-pasta",
    rating: 4.6,
  },
  {
    id: 60031,
    tag: "QUICK & EASY",
    title: "Egg & Veggie Wrap",
    time: "15 mins",
    img: "/Images/egg-wrapper.webp",
    href: "/recipes/egg-veggie-wrap",
    rating: 4.5,
  },
  {
  id: 60041,
  tag: "QUICK & EASY",
  title: "The 3-Ingredient Garlic Butter Chicken Bites I Can't Stop Making",
  time: "25 mins",
  img: "/Images/garlic-butter-chicken.webp",
  href: "/recipes/garlic-butter-chicken",
  rating: 4.7,
},
{
  id: 60051,
  tag: "QUICK & EASY",
  title: "10-Minute Greek Yogurt Bowl",
  time: "10 mins",
  img: "/Images/greek-yogurt-bowl.webp",
  href: "/recipes/greek-yogurt-bowl",
  rating: 4.6,
},
{
  id: 60061,
  tag: "QUICK & EASY",
  title: "Easy Veggie Fried Rice",
  time: "20 mins",
  img: "/Images/veggie-fried-rice.webp",
  href: "/recipes/veggie-fried-rice",
  rating: 4.5,
}
];

const QuickEasyRecipes = () => {
  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // load from localStorage first
    const stored = localStorage.getItem("liked");
    if (stored) setLiked(JSON.parse(stored));

    if (!token) return;

    // sync from backend
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
    <section className="section-gap py-5 aboutus-page">
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold">Quick & Easy Recipes</h2>
        <h3 className="fs-5 fw-normal mt-3 px-2">
          Simple ingredients. Fast results. Perfect for busy days.
        </h3>
      </div>

      <div className="container px-4 bg-transparent">
        <div className="row g-5 justify-content-center">
          {quickEasyRecipes.map((r) => (
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

    {/* Login modal */}
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

export default QuickEasyRecipes;
