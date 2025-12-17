// src/pages/Categories.jsx
import React, { useState, useEffect } from "react";
import "../assets/Css/dashboard.css";
import { FaHeart } from "react-icons/fa";

// icons for the cards
import {
  MdFreeBreakfast,
  MdLunchDining,
  MdDinnerDining,
  MdCake,
} from "react-icons/md";
import { GiForkKnifeSpoon } from "react-icons/gi";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Desserts", "Appetizers"];

// static card info – only for display
const CATEGORY_CARDS = [
  {
    key: "Breakfast",
    label: "BREAKFAST",
    value: 12,
    desc: "Morning recipes & ideas",
    icon: <MdFreeBreakfast className="cat-icon" />,
  },
  {
    key: "Lunch",
    label: "LUNCH",
    value: 9,
    desc: "Mid-day meals & bowls",
    icon: <MdLunchDining className="cat-icon" />,
  },
  {
    key: "Dinner",
    label: "DINNER",
    value: 15,
    desc: "Family mains & dinners",
    icon: <MdDinnerDining className="cat-icon" />,
  },
  {
    key: "Desserts",
    label: "DESSERTS",
    value: 8,
    desc: "Sweet treats & baking",
    icon: <MdCake className="cat-icon" />,
  },
  {
    key: "Appetizers",
    label: "APPETIZERS",
    value: 6,
    desc: "Small bites & starters",
    icon: <GiForkKnifeSpoon className="cat-icon" />,
  },
];

// change if your backend is on a different port
const API_BASE = "http://localhost:5174";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ modal state
  const [openModal, setOpenModal] = useState(false);

  // ✅ edit mode: null = add, number = editing that row id
  const [editId, setEditId] = useState(null);

  // ✅ form state
  const emptyForm = {
    category: "",
    card_id: "",
    tag: "",
    title: "",
    time_label: "",
    img_url: "",
    href: "",
  };

  const [form, setForm] = useState(emptyForm);

  // Fetch items when a category button is clicked
  useEffect(() => {
    if (!selectedCategory) return;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/category-items?category=${encodeURIComponent(
            selectedCategory
          )}`
        );
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error("Fetch category items error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedCategory]);

  const refreshSelected = async () => {
    if (!selectedCategory) return;
    try {
      const res = await fetch(
        `${API_BASE}/api/category-items?category=${encodeURIComponent(
          selectedCategory
        )}`
      );
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      console.error("Refresh failed:", e);
    }
  };

  // ---------- Modal helpers ----------
  const openAddModal = () => {
    setEditId(null);
    setForm({
      ...emptyForm,
      category: selectedCategory || "",
    });
    setOpenModal(true);
  };

  const openEditModal = (item) => {
    setEditId(item.id);
    setForm({
      category: item.category || selectedCategory || "",
      card_id: item.card_id || "",
      tag: item.tag || "",
      title: item.title || "",
      time_label: item.time_label || "",
      img_url: item.img_url || "",
      href: item.href || "",
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditId(null);
    setForm(emptyForm);
  };

  // ---------- Save (ADD or EDIT) ----------
  const handleSave = async () => {
    if (!form.category) {
      alert("Please select a category.");
      return;
    }
    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }

    const isEdit = editId !== null;
    const url = isEdit
      ? `${API_BASE}/api/category-items/${editId}`
      : `${API_BASE}/api/category-items`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: form.category,
          card_id: form.card_id,
          tag: form.tag,
          title: form.title,
          time_label: form.time_label,
          img_url: form.img_url,
          href: form.href,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.error || "Save failed.");
        return;
      }

      closeModal();

      // refresh the currently visible category
      // if user edited into another category, switch to it
      if (selectedCategory === form.category) {
        await refreshSelected();
      } else {
        setSelectedCategory(form.category);
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Server error while saving.");
    }
  };

  // ---------- Delete ----------
  const handleDelete = async (item) => {
    const ok = window.confirm(`Delete "${item.title}"?`);
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/api/category-items/${item.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.error || "Failed to delete.");
        return;
      }
      await refreshSelected();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error while deleting.");
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

      {/* ✅ ADD/EDIT MODAL */}
      {openModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-head">
              <h2 className="modal-title">
                {editId !== null ? "Edit Recipe" : "Add Recipe"}
              </h2>
              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className="modal-grid">
              <label>
                Category
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
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
                  onChange={(e) =>
                    setForm((p) => ({ ...p, card_id: e.target.value }))
                  }
                  placeholder="ex: dn1"
                />
              </label>

              <label>
                Tag
                <input
                  value={form.tag}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tag: e.target.value }))
                  }
                  placeholder="ex: QUICK DINNERS"
                />
              </label>

              <label>
                Title *
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Recipe title"
                />
              </label>

              <label>
                Time Label
                <input
                  value={form.time_label}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time_label: e.target.value }))
                  }
                  placeholder="ex: 45 mins"
                />
              </label>

              <label>
                Image URL
                <input
                  value={form.img_url}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, img_url: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </label>

              <label style={{ gridColumn: "1 / -1" }}>
                Href (link)
                <input
                  value={form.href}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, href: e.target.value }))
                  }
                  placeholder="/recipes/my-recipe"
                />
              </label>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-delete" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="btn-edit" onClick={handleSave}>
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
            className={
              "category-btn-full" + (selectedCategory === cat ? " active" : "")
            }
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* STATIC CARDS – show only on first load (no category selected) */}
      {!selectedCategory && (
        <div className="category-stats-grid">
          {CATEGORY_CARDS.map((card) => (
            <div key={card.key} className="category-card">
              <div className="cat-icon-wrapper">{card.icon}</div>
              <div className="cat-title">{card.label}</div>
              <div className="cat-count">{card.value}</div>
              <div className="cat-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE – show after a button is clicked */}
      {selectedCategory && (
        <>
          <h2 className="existing-title">{selectedCategory} recipes</h2>

          {loading ? (
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
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "16px" }}
                    >
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
                        <button
                          className="btn-edit"
                          type="button"
                          onClick={() => openEditModal(item)}
                        >
                          EDIT
                        </button>
                      </td>

                      <td>
                        <button
                          className="btn-delete"
                          type="button"
                          onClick={() => handleDelete(item)}
                        >
                          DELETE
                        </button>
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

export default Categories;
