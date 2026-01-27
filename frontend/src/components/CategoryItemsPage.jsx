import React, { useEffect, useMemo, useState } from "react";
import { FaHeart, FaRegHeart, FaRegClock, FaStar } from "react-icons/fa";
import API from "../api";
import useFavorites from "../hooks/useFavorites";

function normalizeTime(raw) {
  if (!raw) return "—";
  const t = String(raw).trim();

  // If backend already returns "40 mins" or "2 hours", keep as-is
  // If it's just a number like 40 -> "40 mins"
  if (/^\d+(\.\d+)?$/.test(t)) return `${t} mins`;

  // Prevent accidental duplicates like "40 mins mins"
  return t.replace(/\bmins\s+mins\b/i, "mins").trim();
}

export default function CategoryItemsPage({
  category,
  title,
  subtitle,
  wrapperClass = "section-gap py-5 aboutus-page",
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { liked, toggleFavorite } = useFavorites();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Map "Breakfast" -> "BREAKFAST" etc (your backend tags are uppercase)
  const tag = useMemo(() => String(category || "").toUpperCase(), [category]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await API.get("/recipes", { params: { tag } });
        setItems(res.data?.recipes || []);
      } catch (e) {
        console.error(`Failed to load ${tag} recipes:`, e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [tag]);

  const renderStars = (rating) => {
    const filled = Math.round(Number(rating) || 0);
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        className={i < filled ? "text-warning" : "text-secondary opacity-25"}
      />
    ));
  };

  return (
    <section className={wrapperClass}>
      <div className="bk-head text-center mb-4">
        <h2 className="bk-title display-5 fw-bold">{title}</h2>
        {subtitle ? (
          <h3 className="fs-5 fw-normal mt-3 px-2">{subtitle}</h3>
        ) : null}
      </div>

      <div className="container px-4 bg-transparent">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading…</p>
        ) : items.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items yet.</p>
        ) : (
          <div className="row g-5 justify-content-center">
            {items.map((r) => (
              <div key={r.id} className="col-md-4 d-flex">
                <article
                  className="wk-card bg-white shadow-sm rounded-4 overflow-hidden h-100"
                  style={{ paddingBottom: "15px" }}
                >
                  <a className="d-block position-relative" href={r.href || "#"}>
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
                      className={`wk-like position-absolute top-0 end-0 m-3 ${
                        liked?.[r.id] ? "is-liked text-danger" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(r, {
                          onLoginRequired: () => setShowLoginModal(true),
                        });
                      }}
                    >
                      {liked?.[r.id] ? (
                        <FaHeart size={28} color="red" />
                      ) : (
                        <FaRegHeart size={28} color="white" />
                      )}
                    </button>
                  </a>

                  <div className="p-3">
                    <span className="text-uppercase fw-semibold small text-muted d-block mb-1">
                      {r.tag || tag}
                    </span>

                    <a href={r.href || "#"} className="text-decoration-none text-dark">
                      <h3 className="fw-bold h5 mb-2">{r.title}</h3>
                    </a>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-muted">
                        <FaRegClock className="me-1" />
                        {normalizeTime(r.time_label || r.time)}
                      </span>

                      <span className="d-flex gap-1">
                        {renderStars(r.rating)}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
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
              />
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
