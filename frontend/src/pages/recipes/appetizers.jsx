import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../../api";
import { useNavigate } from "react-router-dom"; // kept for consistency

const appetizersRecipes = [
  {
    id: 5001,
    tag: "APPETIZERS",
    title: "Corn Oysters Are the Retro Summer Dish You Need to Make",
    time: "35 mins",
    img: "/Images/cornoyster.webp",
    href: "/recipes/corn-oyster",
    rating: 4.5,
  },
  {
    id: 5002,
    tag: "APPETIZERS",
    title: "The Easy Recipe I Make for Every Holiday Gathering",
    time: "30 mins",
    img: "/Images/mixednuts.webp",
    href: "/recipes/mixed-nuts",
    rating: 4.6,
  },
  {
    id: 5003,
    tag: "APPETIZERS",
    title: "The Secret to the Best French Bread Pizza",
    time: "25 mins",
    img: "/Images/frenchbreadpizza.webp",
    href: "/recipes/french-bread-pizza",
    rating: 4.6,
  },
  {
    id: 5004,
    tag: "APPETIZERS",
    title: "For the Best Loaded Queso Dip, Skip the Velveeta",
    time: "35 mins",
    img: "/Images/loadedqueso.webp",
    href: "/recipes/loaded-queso",
    rating: 5.0,
  },
  {
    id: 5005,
    tag: "APPETIZERS",
    title: "How to Make the Best Guacamole",
    time: "12 mins",
    img: "/Images/Guacamole.webp",
    href: "/recipes/Guacamole",
    rating: 4.2,
  },
  {
    id: 5006,
    tag: "APPETIZERS",
    title: "The 4-Ingredient Appetizer I’m Making All Summer Long",
    time: "24 mins",
    img: "/Images/grilledfetastuffedpeppers.webp",
    href: "/recipes/grilled-feta-stuffed-peppers-recipe",
    rating: 3.5,
  },
   {
    id: 5007,
    tag: "APPETIZERS",
    title: "The 4-Ingredient Zucchini Dip My Whole Family Loves",
    time: "25 mins",
    img: "/Images/zucchinidip.webp",
    href: "/recipes/zucchinidip",
    rating: 5.0,
  },
  {
    id: 5008,
    tag: "APPETIZERS",
    title: "The 2-Ingredient Chicken Wings You Need To Make",
    time: "35 mins",
    img: "/Images/chickenwings.webp",
    href: "/recipes/chickenwings",
    rating: 4.2,
  },
  {
    id: 5009,
    tag: "APPETIZERS",
    title: "The Easy Appetizer I Make Every Game Day",
    time: "60 mins",
    img: "/Images/burgera.webp",
    href: "/recipes/burgera",
    rating: 3.5,
  }
];

const Appetizers = () => {
  const navigate = useNavigate(); // not used, kept same as other pages

  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");

  // 1) load from localStorage first (fast UI)
  const stored = localStorage.getItem("liked");
  if (stored) setLiked(JSON.parse(stored));

  // 2) then, if logged in, sync from backend (real truth)
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
      <FaStar
        key={i}
        className={i < Math.round(rating || 0) ? "on" : ""}
      />
    ));

  return (
    <section className="appetizers section-gap py-5 aboutus-page">
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold">Appetizers Recipes</h2>
        <h3 className="fs-5 fw-normal mt-3 px-2">Whether you need a casual pre-dinner nibble or something fancy to take to a holiday party,
        we’ve got all the appetizing appetizers here for you.</h3>
        <a
          className="bk-more fs-2 text-decoration-none"
          href="/recipes?tag=appetizers"
        ></a>
      </div>

      <div className="container px-4 bg-transparent">
        <div className="row g-5 justify-content-center">
          {appetizersRecipes.map((r) => (
            <div key={r.id} className="col-md-4 d-flex">
              <article
                className="wk-card bg-white shadow-sm rounded-4 overflow-hidden"
                style={{ paddingBottom: "15px" }}
              >
                <a className="d-block position-relative" href={r.href}>
                  <img
                    src={r.img}
                    alt={r.title}
                    className="img-fluid w-100"
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

export default Appetizers;
