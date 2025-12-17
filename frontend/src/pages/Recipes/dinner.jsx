import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../../api";
import { useNavigate } from "react-router-dom"; // kept for consistency

const dinnerRecipes = [
  {
    id: 3001,
    tag: "DINNER",
    title: "Meatloaf Muffins Are a Dinner My Whole Family Can Agree On",
    time: "55 mins",
    img: "/Images/meatloaf.webp",
    href: "/recipes/meat-loaf",
    rating: 4.5,
  },
  {
    id: 3002,
    tag: "DINNER",
    title: "My Loaded Chicken Breasts Are Ready In 15 Minutes Flat",
    time: "20 mins",
    img: "/Images/loadedchickenbreasts.webp",
    href: "/recipes/loaded-chicken-breasts",
    rating: 4.2,
  },
  {
    id: 3003,
    tag: "DINNER",
    title: "This Irish Potato Casserole Is the Ultimate Comfort Food",
    time: "80 mins",
    img: "/Images/irishpatato.webp",
    href: "/recipes/irish-patato",
    rating: 3.5,
  },
  {
    id: 3004,
    tag: "DINNER",
    title: "My Grandma Judy’s Matzo Ball Soup Tastes Like Home",
    time: "60 mins",
    img: "/Images/grandmasmatzoball.webp",
    href: "/recipes/grandmas-matzo-ball",
    rating: 5.0,
  },
  {
    id: 3005,
    tag: "DINNER",
    title: "I Make My 2-Ingredient Caesar Salmon On Busy Weeknights",
    time: "15 mins",
    img: "/Images/caesarsalmonrecipe.webp",
    href: "/recipes/caesar-salmon-recipe",
    rating: 4.6,
  },
  {
    id: 3006,
    tag: "DINNER",
    title: "My Favorite 5-Ingredient Dinner Couldn’t Be Easier",
    time: "2 hours",
    img: "/Images/fetatomatostuffedspaghetti.webp",
    href: "/recipes/feta-tomato-stuffed-spaghetti",
    rating: 4.6,
  },
  {
    id: 3007,
    tag: "DINNER",
    title: "The 15-Minute Dinner I Make All Summer Long",
    time: "15 mins",
    img: "/Images/shrimpbowl.webp",
    href: "/recipes/shrimpbowl",
    rating: 5.0,
  },
  {
    id: 3008,
    tag: "DINNER",
    title: "My Mom’s Korean Curry Rice Is My Favorite Comfort Food",
    time: "75 mins",
    img: "/Images/curry-rice.webp",
    href: "/recipes/curry-rice",
    rating: 4.6,
  },
  {
    id: 3009,
    tag: "DINNER",
    title: "The 20-Minute Dinner I’ll Be Making All Summer Longr",
    time: "20 mins",
    img: "/Images/lemonrissoto.webp",
    href: "/recipes/lemonrissoto",
    rating: 4.6,
  }
];

const Dinner = () => {
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
      <FaStar key={i} className={i < Math.round(rating || 0) ? "on" : ""} />
    ));

  return (
    <section className="dinner section-gap py-5 aboutus-page">
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold ">Dinner Recipes</h2>
        <h3 className="fs-5 fw-normal mt-3 px-2">Need help with dinner ideas? We have one-pot dishes,
        30-minute meals, slow cooker feasts, and dinner recipes for every mood.</h3>
        <a className="bk-more fs-2 text-decoration-none" href="/recipes?tag=dinner"></a>
      </div>

      <div className="container px-4 bg-transparent">
        <div className="row g-5 justify-content-center">
          {dinnerRecipes.map((r) => (
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
                    style={{
                      borderBottomLeftRadius: "0.5rem",
                      borderBottomRightRadius: "0.5rem",
                    }}
                  />

                  <button
                    type="button"
                    className={` wk-like position-absolute top-0 end-0 m-3 ${
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

export default Dinner;
