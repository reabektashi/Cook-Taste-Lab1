// src/pages/recipes/breakfast.jsx
import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";

// ✅ All ids start with 1, all tags = "BREAKFAST"
const breakfastRecipes = [
  {
    id: 1,
    tag: "BREAKFAST",
    title: "Sheet Pan Salmon and Broccoli with Miso Butter",
    time: "45 mins",
    img: "/Images/Sheet Pan Salmon and Broccoli .webp",
    href: "/recipes/sheet-pan-salmon",
    rating: 4.5,
  },
  {
    id: 2,
    tag: "BREAKFAST",
    title: "Quick Beef Stir Fry with Bell Peppers",
    time: "40 mins",
    img: "/Images/Sheet Pan Salmon and Broccoli .webp",
    href: "/recipes/quick-beef-stir-fry",
    rating: 4.8,
  },
  {
    id: 3,
    tag: "BREAKFAST",
    title: "My Granny's 5-Ingredient Party Pie",
    time: "20 mins",
    img: "/Images/Sheet Pan Salmon and Broccoli .webp",
    href: "/recipes/granny-party-pie",
    rating: 5,
  },
  {
    id: 4,
    tag: "BREAKFAST",
    title: "Chicken Tacos with Jalapeños",
    time: "35 mins",
    img: "/Images/Sheet Pan Salmon and Broccoli .webp",
    href: "/recipes/chicken-tacos",
    rating: 4.7,
  },
  {
    id: 5,
    tag: "BREAKFAST",
    title: "Cheesy Veggie Lasagna",
    time: "50 mins",
    img: "/Images/Sheet Pan Salmon and Broccoli .webp",
    href: "/recipes/veggie-lasagna",
    rating: 4.6,
  },
  {
    id: 6,
    tag: "BREAKFAST",
    title: "Chocolate Chip Banana Bread",
    time: "60 mins",
    img: "/Images/Sheet Pan Salmon and Broccoli .webp",
    href: "/recipes/banana-bread",
    rating: 4.9,
  },
];

const Breakfast = () => {
  // local like state
  const [liked, setLiked] = useState({});

  // load likes once
  useEffect(() => {
    const stored = localStorage.getItem("breakfastLikes");
    if (stored) {
      setLiked(JSON.parse(stored));
    }
  }, []);

  const handleToggleFavorite = (recipe) => {
    setLiked((prev) => {
      const updated = { ...prev, [recipe.id]: !prev[recipe.id] };
      localStorage.setItem("breakfastLikes", JSON.stringify(updated));
      return updated;
    });
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
    <section className="breakfast section-gap container py-5">
      {/* Header – like your home Simply Recipes block */}
      <div className="bk-head d-flex justify-content-between align-items-center mb-4">
        <h2 className="bk-title display-5 fw-bold mb-0">Simply Recipes</h2>
        <a
          className="bk-more fs-2 text-decoration-none"
          href="/recipes?tag=breakfast"
        >
        </a>
      </div>

      {/* Card grid – wk-grid + Bootstrap grid */}
      <div className="bk-grid row gy-4 gx-4">
        {breakfastRecipes.map((r) => (
          <article key={r.id} className="wk-card col-md-4">
            <a className="bk-thumb d-block position-relative" href={r.href}>
              <img
                src={r.img}
                alt={r.title}
                className="img-fluid rounded-4 w-100"
              />

              {/* like button in the top-right corner */}
              <button
                type="button"
                className={`bk-like position-absolute top-0 end-0 m-6 p-0 bg-transparent border-0 ${
                  liked[r.id] ? "is-liked text-danger" : ""
                }`}
                aria-label={
                  liked[r.id] ? "Remove from favorites" : "Add to favorites"
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleFavorite(r);
                }}
              >
                {liked[r.id] ? <FaHeart /> : <FaRegHeart />}
              </button>
            </a>

            <div className="bk-body mt-3">
              <span className="bk-tag text-uppercase fw-semibold small d-block mb-1">
                {r.tag}
              </span>

              <a
                className="bk-title-link text-decoration-none text-dark"
                href={r.href}
              >
                <h3 className="bk-h3 h4 fw-bold mb-2">{r.title}</h3>
              </a>

              <div className="bk-meta d-flex justify-content-between align-items-center">
                <span className="bk-time small text-muted">
                  <FaRegClock className="me-1" />
                  {r.time}
                </span>
                <span
                  className="bk-stars text-warning"
                  aria-label={`Rating ${r.rating} out of 5`}
                >
                  {renderStars(r.rating)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Breakfast;
