import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../api";
import useFavorites from "../hooks/useFavorites";

export default function CategoryItemsPage({
  category,          // e.g. "Breakfast"
  title,             // page title
  subtitle,          // page subtitle
  wrapperClass = "breakfast section-gap py-5 aboutus-page", // keep same look
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { liked, toggleFavorite } = useFavorites();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // IMPORTANT: favorites join in your backend is by card_id
  const getRecipeId = (item) => {
    const cid = item?.card_id;
    if (cid !== null && cid !== undefined && String(cid).trim() !== "") return String(cid);
    return String(item?.id);
  };

  // Load items from category_items table
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await API.get("/category-items", { params: { category } });
        setItems(Array.isArray(res.data?.items) ? res.data.items : []);
      } catch (e) {
        console.error("Failed to load category items:", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < Math.round(rating || 0) ? "on" : ""} />
    ));

  return (
    <section className={wrapperClass}>
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold ">{title || `${category} Recipes`}</h2>
        {subtitle ? <h3 className="fs-5 fw-normal mt-3 px-2">{subtitle}</h3> : null}
      </div>

      <div className="container px-4 bg-transparent">
        {loading ? (
          <p>Loading…</p>
        ) : (
          <div className="row g-5 justify-content-center">
            {items.map((r) => {
              const recipeId = getRecipeId(r);

              // map DB fields -> what your favorites hook expects
              const favRecipeShape = {
                id: recipeId,                 // IMPORTANT
                title: r.title,
                tag: r.tag || category,
                time_label: r.time_label,
                img: r.img_url,
                href: r.href,
                rating: r.rating || 0,
              };

              return (
                <div key={r.id} className="col-md-4 d-flex">
                  <article
                    className="wk-card bg-white shadow-sm rounded-4 overflow-hidden"
                    style={{ paddingBottom: "15px" }}
                  >
                    <a className="d-block position-relative" href={r.href || "#"}>
                      <img
                        src={r.img_url || "/Images/fallback.jpg"}
                        alt={r.title}
                        className="img-fluid w-100"
                        style={{
                          borderBottomLeftRadius: "0.5rem",
                          borderBottomRightRadius: "0.5rem",
                        }}
                        onError={(e) => (e.currentTarget.src = "/Images/fallback.jpg")}
                      />

                      <button
                        type="button"
                        className={`wk-like position-absolute top-0 end-0 m-3 ${
                          liked[recipeId] ? "is-liked text-danger" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(favRecipeShape, {
                            onLoginRequired: () => setShowLoginModal(true),
                          });
                        }}
                      >
                        {liked[recipeId] ? (
                          <FaHeart size={28} color="red" />
                        ) : (
                          <FaRegHeart size={28} color="white" />
                        )}
                      </button>
                    </a>

                    <div className="p-3">
                      <span className="text-uppercase fw-semibold small text-muted d-block mb-1">
                        {r.tag || category}
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
              );
            })}
          </div>
        )}
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
}
