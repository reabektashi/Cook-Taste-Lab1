import React, { useEffect, useMemo, useState } from "react";
import "../assets/Css/dashboard.css";
import { FaHeart } from "react-icons/fa";
import {
  MdFreeBreakfast,
  MdLunchDining,
  MdDinnerDining,
  MdCake,
  MdFastfood,
} from "react-icons/md";
import API from "../api"; // ✅ your axios instance

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Desserts", "Appetizers"];

// UI cards (count becomes dynamic)
const CATEGORY_CARDS = [
  {
    key: "Breakfast",
    label: "BREAKFAST",
    desc: "Morning recipes & ideas",
    icon: <MdFreeBreakfast className="cat-icon" />,
  },
  {
    key: "Lunch",
    label: "LUNCH",
    desc: "Mid-day meals & bowls",
    icon: <MdLunchDining className="cat-icon" />,
  },
  {
    key: "Dinner",
    label: "DINNER",
    desc: "Family mains & dinners",
    icon: <MdDinnerDining className="cat-icon" />,
  },
  {
    key: "Desserts",
    label: "DESSERTS",
    desc: "Sweet treats & baking",
    icon: <MdCake className="cat-icon" />,
  },
  {
    key: "Appetizers",
    label: "APPETIZERS",
    desc: "Small bites & starters",
    icon: <MdFastfood className="cat-icon" />,
  },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // ✅ dynamic counts
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  // ✅ modal (kept like your style)
  const [openModal, setOpenModal] = useState(false);

  const emptyForm = useMemo(
    () => ({
      category: "",
      card_id: "",
      title: "",
      tag: "",
      time_label: "",
      img_url: "",
      href: "",
    }),
    []
  );

  const [form, setForm] = useState(emptyForm);

  // ---------------------------
  // ✅ fetch counts for cards
  // ---------------------------
  const fetchCounts = async () => {
    setLoadingCounts(true);
    try {
      const results = await Promise.all(
        CATEGORIES.map(async (cat) => {
          try {
            const res = await API.get("/category-items", {
              params: { category: cat },
            });
            const rows = res.data?.items || [];
            return [cat, rows.length];
          } catch {
            return [cat, 0];
          }
        })
      );

      const map = {};
      results.forEach(([cat, count]) => (map[cat] = count));
      setCounts(map);
    } finally {
      setLoadingCounts(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------
  // ✅ fetch table rows by category
  // ---------------------------
  useEffect(() => {
    if (!selectedCategory) return;

    (async () => {
      setLoadingItems(true);
      try {
        const res = await API.get("/category-items", {
          params: { category: selectedCategory },
        });
        setItems(Array.isArray(res.data?.items) ? res.data.items : []);
      } catch (err) {
        console.error("Fetch category items error:", err);
        setItems([]);
      } finally {
        setLoadingItems(false);
      }
    })();
  }, [selectedCategory]);

  // ---------------------------
  // MODAL helpers (optional)
  // ---------------------------
  const openAddModal = () => {
    setForm({ ...emptyForm, category: selectedCategory || "" });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setForm(emptyForm);
  };

  // (Optional) Save handler if you want “Add Recipe” to really insert
  const handleSave = async () => {
    if (!form.category || !form.title.trim()) return;

    try {
      await API.post(
        "/category-items",
        {
          category: form.category,
          card_id: form.card_id || null,
          tag: form.tag || null,
          title: form.title,
          time_label: form.time_label || null,
          img_url: form.img_url || null,
          href: form.href || null,
        },
        { withCredentials: true }
      );

      closeModal();

      // refresh table + counts
      if (selectedCategory) {
        const res = await API.get("/category-items", {
          params: { category: selectedCategory },
        });
        setItems(Array.isArray(res.data?.items) ? res.data.items : []);
      }
      fetchCounts();
    } catch (err) {
      console.error("Save category item error:", err);
      alert("Save failed (check admin login / API).");
    }
  };

  return (
    <div className="categories-page">
      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Categories</h1>
          <p className="admin-subtitle">
            Organize your Cook&Taste recipes into meaningful groups.
          </p>
        </div>

        <button className="btn-add" type="button" onClick={openAddModal}>
          + ADD RECIPE
        </button>
      </div>

      {/* ✅ ADD MODAL */}
      {openModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-head">
              <h2 className="modal-title">Add Recipe</h2>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="modal-grid">
              <label>
                Category *
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                >
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Card ID (optional)
                <input
                  value={form.card_id}
                  onChange={(e) => setForm((p) => ({ ...p, card_id: e.target.value }))}
                  placeholder="ex: 1001"
                />
              </label>

              <label style={{ gridColumn: "1 / -1" }}>
                Title *
                <input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Recipe title"
                />
              </label>

              <label>
                Tag
                <input
                  value={form.tag}
                  onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                  placeholder="ex: HEALTHY"
                />
              </label>

              <label>
                Time Label
                <input
                  value={form.time_label}
                  onChange={(e) => setForm((p) => ({ ...p, time_label: e.target.value }))}
                  placeholder="ex: 30 mins"
                />
              </label>

              <label style={{ gridColumn: "1 / -1" }}>
                Image URL
                <input
                  value={form.img_url}
                  onChange={(e) => setForm((p) => ({ ...p, img_url: e.target.value }))}
                  placeholder="/Images/something.jpg"
                />
              </label>

              <label style={{ gridColumn: "1 / -1" }}>
                Href
                <input
                  value={form.href}
                  onChange={(e) => setForm((p) => ({ ...p, href: e.target.value }))}
                  placeholder="/recipes/some-slug"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn-delete" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-edit" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY BUTTONS */}
      <div className="category-buttons-full">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={"category-btn-full" + (selectedCategory === cat ? " active" : "")}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ CARDS (only when no category selected) */}
      {!selectedCategory && (
        <div className="category-stats-grid">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.key}
              className="category-card"
              onClick={() => setSelectedCategory(card.key)}
              style={{ cursor: "pointer" }}
            >
              <div className="cat-icon-wrapper">{card.icon}</div>
              <div className="cat-title">{card.label}</div>

              <div className="cat-count">
                {loadingCounts ? "…" : counts[card.key] ?? 0}
              </div>

              <div className="cat-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE */}
      {selectedCategory && (
        <>
          <h2 className="existing-title">{selectedCategory} recipes</h2>

          {loadingItems ? (
            <p style={{ padding: "12px 0" }}>Loading...</p>
          ) : (
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Time</th>
                  <th>
                    <FaHeart className="fav-icon" /> Favs
                  </th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: 16 }}>
                      No recipes for this category yet.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {item.img_url ? (
                          <img
                            src={item.img_url}
                            alt={item.title}
                            className="category-img-thumb"
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{item.title}</td>
                      <td>{item.tag}</td>
                      <td>{item.time_label}</td>
                      <td className="favorites-cell">{item.favorites ?? 0}</td>
                      <td>
                        <button className="btn-edit">EDIT</button>
                      </td>
                      <td>
                        <button className="btn-delete">DELETE</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
