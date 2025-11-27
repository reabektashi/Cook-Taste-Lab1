import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../../api";

const dessertsRecipes = [
  {
    id: 1,
    tag: "DESSERTS",
    title:"2-Ingredient Cherry Cobbler I Make Every Saturday ",
    time: "30 mins",
    img: "/Images/cherrycobbler.webp",
    href: "/recipes/cherry-cobbler-Recipe",
    rating: 4.5,
  },
  {
    id: 2,
    tag: "DESSERTS",
    title: "I Make This Easy Red Velvet Cake Every Year for Passovered" ,
    time: "60 mins",
    img: "/Images/Red-Velvet-Cake.jpg",
    href: "/recipes/Red-Velvet-Cake-Recipe",
    rating: 4.2,
  },
  {
    id: 3,
    tag: "DESSERTS",
    title:"These 4-Ingredient Cake Pops Take 30 Minutes to Make",
    time: "40 mins",
    img: "/Images/Cake-Pops.jpg",
    href: "/recipes/Cake-Pops-Recipe",
    rating: 3.5,
  },
  {
    id: 4,
    tag: "DESSERTS",
    title: "The Easy Oreo-Cheesecake Anyone Can Make ",
    time: "60 mins",
    img: "/Images/Oreo-Cheesecake.jpg",
    href: "/recipes/Oreo-Cheesecake-Recipe",
    rating: 5.0,
  },
  {
    id: 5,
    tag: "DESSERTS",
    title: "The best Pumpkin Chocolate Chip Muffins",
    time: "65 mins",
    img: "/Images/Chocolate-Pumpkin-Muffins.jpg",
    href: "/recipesChocolate-Pumpkin-Muffins-recipe",
    rating: 4.6,
  },
  {
    
    id: 6,
    tag: "DESSERTS",
    title: "The Easy Chocolate Pudding Cake I Make on Repeat ",
    time: "45 mins",
    img: "/Images/Chocolate-Pudding-Cake.jpg",
    href: "/recipes/Chocolate-Pudding-Cake-Recipe",
    rating: 4.6,
  },
];

const Desserts = () => {
  
  
  // local like state
  const [liked, setLiked] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);

  // load likes once
  useEffect(() => {
    const stored = localStorage.getItem("dessertsLikes");
    if (stored) {
      setLiked(JSON.parse(stored));
    }
  }, []);

  const handleToggleFavorite = async (recipe) => {
    // kontrollo nëse user-i është i loguar
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    // a është aktualisht e pëlqyer?
    const wasLiked = !!liked[recipe.id];

    // logjika ekzistuese – update local state + localStorage
    setLiked((prev) => {
      const updated = { ...prev, [recipe.id]: !prev[recipe.id] };
      localStorage.setItem("dessertsLikes", JSON.stringify(updated));
      return updated;
    });

    // sync me backend (favorites API)
    try {
      if (wasLiked) {
        // nëse ka qenë e pëlqyer → tani po e heqim → DELETE
        await API.delete(`/favorites/${recipe.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      } else {
        // nëse s’ka qenë e pëlqyer → tani po e shtojmë → POST
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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      }
    } catch (err) {
      console.error("favorites sync error:", err);
      // opcionalisht: mundesh me kthye state-in mbrapa nese deshton
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


    
    // Bootstrap + your custom classes
    <section className="desserts section-gap py-5">
      {/* Header – like your home Simply Recipes block */}
      <div className="bk-head d-flex justify-content-center mb-4">
        <h2 className="bk-title display-5 fw-bold ">Desserts Recipes</h2>
        <a
          className="bk-more fs-2 text-decoration-none"
          href="/recipes?tag=desserts"
        ></a>
      </div>

      <div className="container px-4 bg-transparent">
        <div className="row g-5 justify-content-center">
          {dessertsRecipes.map((r) => (
            <div key={r.id} className="col-md-4 d-flex">
              <article
                className="wk-card bg-white shadow-sm rounded-4 overflow-hidden"
                style={{ paddingBottom: "15px" }}
              >
                {/* Thumbnail */}
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

                  {/* heart button */}
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

                {/* Body */}
                <div className="p-3">
                  <span className="text-uppercase fw-semibold small text-muted d-block mb-1">
                    {r.tag}
                  </span>

                  <a
                    href={r.href}
                    className="text-decoration-none text-dark"
                  >
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

      {/* 🔵 Bootstrap modal – "Please log in to save favorites." */}
      <div
        className={`modal fade ${
          showLoginModal ? "show d-block" : ""
        }`}
        tabIndex="-1"
        aria-hidden={!showLoginModal}
        style={
          showLoginModal
            ? { backgroundColor: "rgba(0,0,0,0.5)" }
            : {}
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
              <p className="mb-0">
                Please log in to save favorites.
              </p>
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

export default Desserts;