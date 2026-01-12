import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../api"; // korrigjo rrugën sipas vendndodhjes së file-it
import "../assets/Css/style.css"; // rruga relative



const quickEasyRecipes = [
  { id: 6001, tag: "QUICK & EASY", title: "The Cheap, Nutritious Breakfast I Make All the Time (It Takes 5 Minutes)", time: "5 mins", img: "/Images/avocado-toast.webp", rating: 4.8 },
  { id: 6002, tag: "QUICK & EASY", title: "Creamy Lemon Pasta", time: "20 mins", img: "/Images/Creamy-Lemon-Pasta.webp", rating: 4.6 },
  { id: 6003, tag: "QUICK & EASY", title: "Egg & Veggie Wrap", time: "15 mins", img: "/Images/egg-wrapper.webp", rating: 4.5 },
];

const QuickEasyRecipes = () => {
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
    if (!token) { setShowLoginModal(true); return; }

    const wasLiked = !!liked[recipe.id];
    setLiked(prev => {
      const updated = { ...prev, [recipe.id]: !prev[recipe.id] };
      localStorage.setItem("liked", JSON.stringify(updated));
      return updated;
    });

    try {
      if (wasLiked) await API.delete(`/favorites/${recipe.id}`, { withCredentials: true });
      else await API.post("/favorites", { recipeId: recipe.id, recipe }, { withCredentials: true });
    } catch (err) {
      console.error("favorites sync error:", err);
    }
  };

  const renderStars = (rating) => Array.from({ length: 5 }).map((_, i) => (
    <FaStar key={i} className={i < Math.round(rating || 0) ? "on" : ""} />
  ));

  return (
    <section className="section-gap py-5 aboutus-page">
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold">Quick & Easy Recipes</h2>
        <h3 className="fs-5 fw-normal mt-3 px-2">Simple ingredients. Fast results. Perfect for busy days.</h3>
      </div>

      <div className="container px-4 bg-transparent">
        <div className="row g-5 justify-content-center">
          {quickEasyRecipes.map(r => (
            <div key={r.id} className="col-md-4 d-flex">
              <article className="wk-card bg-white shadow-sm rounded-4 overflow-hidden" style={{ paddingBottom: "15px" }}>
                <a className="d-block position-relative" href={r.href}>
                  <img src={r.img} alt={r.title} className="img-fluid w-100" />
                  <button
                    type="button"
                    className={`wk-like position-absolute top-0 end-0 m-3 ${liked[r.id] ? "is-liked text-danger" : ""}`}
                    onClick={(e) => { e.preventDefault(); handleToggleFavorite(r); }}
                  >
                    {liked[r.id] ? <FaHeart size={28} color="red" /> : <FaRegHeart size={28} color="white" />}
                  </button>
                </a>
                <div className="p-3">
                  <span className="text-uppercase fw-semibold small text-muted d-block mb-1">{r.tag}</span>
                  <a href={r.href} className="text-decoration-none text-dark">
                    <h3 className="fw-bold h5 mb-2">{r.title}</h3>
                  </a>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small text-muted"><FaRegClock className="me-1" />{r.time}</span>
                    <span className="text-warning">{renderStars(r.rating)}</span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickEasyRecipes;
