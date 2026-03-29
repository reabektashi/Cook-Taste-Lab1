
import React, { useEffect, useMemo, useState } from "react";
import "../assets/Css/dashboard.css";
import { FaHeart } from "react-icons/fa";
import {
  MdFreeBreakfast,
  MdLunchDining,
  MdDinnerDining,
  MdCake,
  MdFastfood,


  MdFlashOn,
  MdSpa,
  MdFavorite,
  MdSoupKitchen,
  MdEco,        
  MdLunchDining as MdMealPrepIcon, 
} from "react-icons/md";
import API from "../api";


const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Appetizers",
  "Quick&Easy",
  "Vegetarian",
  "Healthy",
  "InstantPot",
  "Vegan",
  "MealPrep",
];

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

  
  {
    key: "QuickAndEasy",
    label: "QUICK AND EASY",
    desc: "Fast & simple recipes",
    icon: <MdFlashOn className="cat-icon" />,
  },
  {
    key: "Vegetarian",
    label: "VEGETARIAN",
    desc: "Meat-free meals",
    icon: <MdSpa className="cat-icon" />,
  },
  {
    key: "Healthy",
    label: "HEALTHY",
    desc: "Balanced & nutritious",
    icon: <MdFavorite className="cat-icon" />,
  },
  {
    key: "InstantPot",
    label: "INSTANT POT",
    desc: "Pressure cooker recipes",
    icon: <MdSoupKitchen className="cat-icon" />,
  },
  {
    key: "Vegan",
    label: "VEGAN",
    desc: "100% plant-based",
    icon: <MdEco className="cat-icon" />,
  },
  {
    key: "MealPrep",
    label: "MEAL PREP",
    desc: "Plan & prep ahead",
    icon: <MdMealPrepIcon className="cat-icon" />,
  },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = useMemo(
    () => ({
      category: "",
      title: "",
      tag: "",
      time_label: "",
      img_url: "",
      href: "",
    }),
    []
  );

  const [form, setForm] = useState(emptyForm);

 
  const isValidImageUrl = (value) => {
    if (!value) return true; 
    return /\.(jpe?g|png|webp|gif|svg)(\?.*)?$/i.test(String(value).trim());
  };

  
  const fetchCounts = async () => {
    setLoadingCounts(true);
    try {
      const res = await API.get("/category-items/counts", {
        withCredentials: true,
      });
      setCounts(res.data?.counts || {});
    } catch (err) {
      console.error("Fetch counts error:", err);
      setCounts({});
    } finally {
      setLoadingCounts(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  
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

  const refreshItems = async () => {
    if (!selectedCategory) return;
    const res = await API.get("/category-items", {
      params: { category: selectedCategory },
    });
    setItems(Array.isArray(res.data?.items) ? res.data.items : []);
  };

  
  const openAddModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({ ...emptyForm, category: selectedCategory || "" });
    setOpenModal(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setEditingId(item.id);

    setForm({
      category: item.category || selectedCategory || "",
      title: item.title ?? "",
      tag: item.tag ?? "",
      time_label: item.time_label ?? "",
      img_url: item.img_url ?? "",
      href: item.href ?? "",
    });

    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setForm(emptyForm);
    setIsEditing(false);
    setEditingId(null);
  };


  const handleSave = async () => {
    if (!form.category || !form.title.trim()) return;

    if (!isValidImageUrl(form.img_url)) {
      alert(
        "Image URL must end with an image extension (.jpg, .jpeg, .png, .webp, .gif, .svg)."
      );
      return;
    }

    const payload = {
      category: form.category,
      tag: form.tag || null,
      title: form.title,
      time_label: form.time_label || null,
      img_url: form.img_url || null,
      href: form.href || null,
    };

    try {
      if (isEditing && editingId) {
        await API.put(`/category-items/${editingId}`, payload, {
          withCredentials: true,
        });
      } else {
        await API.post("/category-items", payload, { withCredentials: true });
      }

      closeModal();
      await refreshItems();
      fetchCounts();
    } catch (err) {
      console.error(isEditing ? "Edit recipe error:" : "Save recipe error:", err);
      console.log("STATUS:", err?.response?.status);
      console.log("DATA:", err?.response?.data);
      alert("Operation failed (check admin login / cookies).");
    }
  };

 
  const handleDelete = async (item) => {
    const ok = window.confirm(`Delete "${item.title}"?`);
    if (!ok) return;

    try {
      await API.delete(`/category-items/${item.id}`, { withCredentials: true });
      await refreshItems();
      fetchCounts();
    } catch (err) {
      console.error("Delete recipe error:", err);
      console.log("STATUS:", err?.response?.status);
      console.log("DATA:", err?.response?.data);
      alert("Delete failed (check admin login / cookies).");
    }
  };

  return (
    <div className="categories-page">
  
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

 
      {openModal && (
        <div className="modal-backdrop" onMouseDown={closeModal}>
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2 className="modal-title">
                {isEditing ? "Edit Recipe" : "Add Recipe"}
              </h2>
              <button className="modal-close" type="button" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="modal-grid">
              <label>
                Category *
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
                  type="text"
                  value={form.time_label}
                  onChange={(e) =>
                  setForm((p) => ({ ...p, time_label: e.target.value }))}
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
              <button className="btn-delete" type="button" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-edit" type="button" onClick={handleSave}>
                {isEditing ? "Update" : "Save"}
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
            type="button"
            className={"category-btn-full" + (selectedCategory === cat ? " active" : "")}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CARDS */}
      {!selectedCategory && (
        <div className="category-stats-grid">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.key}
              className="category-card"
              onClick={() => setSelectedCategory(card.key)}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedCategory(card.key);
              }}
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
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => openEditModal(item)}
                        >
                          EDIT
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-delete"
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
