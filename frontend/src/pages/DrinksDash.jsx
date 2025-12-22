import React, { useEffect, useState } from "react";
import "../assets/Css/dashboard.css";
import { FaHeart } from "react-icons/fa";

import {
  MdLocalBar,
  MdNoDrinks,
  MdCoffee,
} from "react-icons/md";
import { GiOrange } from "react-icons/gi";
import { MdBlender } from "react-icons/md";

const API_BASE = "http://localhost:5174";

const DRINK_CATEGORIES = [
  "Cocktails",
  "Mocktails",
  "Smoothies",
  "Coffee",
  "Juices",
];

// 🔹 STATIC CARDS (vetëm UI, si te Categories)
const DRINK_CARDS = [
  {
    key: "Cocktails",
    label: "COCKTAILS",
    value: 12,
    desc: "Alcoholic mixed drinks",
    icon: <MdLocalBar className="cat-icon" />,
  },
  {
    key: "Mocktails",
    label: "MOCKTAILS",
    value: 7,
    desc: "Non-alcoholic drinks",
    icon: <MdNoDrinks className="cat-icon" />,
  },
  {
    key: "Smoothies",
    label: "SMOOTHIES",
    value: 10,
    desc: "Blended fruit drinks",
    icon: <MdBlender className="cat-icon" />,
  },
  {
    key: "Coffee",
    label: "COFFEE",
    value: 6,
    desc: "Hot & cold coffee",
    icon: <MdCoffee className="cat-icon" />,
  },
  {
    key: "Juices",
    label: "JUICES",
    value: 8,
    desc: "Fresh juice drinks",
    icon: <GiOrange className="cat-icon" />,
  },
];

function DrinksDash() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ MODAL
  const [openModal, setOpenModal] = useState(false);

  // ✅ FORM
  const emptyForm = {
    category: "",
    title: "",
    tag: "",
    time_label: "",
    img_url: "",
  };

  const [form, setForm] = useState(emptyForm);

  // ---------------- FETCH DRINKS ----------------
  useEffect(() => {
    if (!selectedCategory) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/drinks?category=${encodeURIComponent(
            selectedCategory
          )}`
        );

        if (!res.ok) {
          setItems([]);
          return;
        }

        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error("Fetch drinks error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  // ---------------- MODAL HELPERS ----------------
  const openAddModal = () => {
    setForm({
      ...emptyForm,
      category: selectedCategory || "",
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setForm(emptyForm);
  };

  return (
    <div className="categories-page">
      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Drinks</h1>
          <p className="admin-subtitle">
            Organize drinks recipes by category.
          </p>
        </div>

        <button className="btn-add" type="button" onClick={openAddModal}>
          + ADD DRINK
        </button>
      </div>

      {/* ✅ ADD DRINK MODAL */}
      {openModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-head">
              <h2 className="modal-title">Add Drink</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
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
                  {DRINK_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label>
                Title *
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Drink title"
                />
              </label>

              <label>
                Tag
                <input
                  value={form.tag}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tag: e.target.value }))
                  }
                  placeholder="ex: SUMMER"
                />
              </label>

              <label>
                Time Label
                <input
                  value={form.time_label}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time_label: e.target.value }))
                  }
                  placeholder="ex: 5 mins"
                />
              </label>

              <label style={{ gridColumn: "1 / -1" }}>
                Image URL
                <input
                  value={form.img_url}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, img_url: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn-delete" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn-edit">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY BUTTONS */}
      <div className="category-buttons-full">
        {DRINK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={
              "category-btn-full" +
              (selectedCategory === cat ? " active" : "")
            }
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ CARDS (vetëm kur s’ka kategori të zgjedhur) */}
      {!selectedCategory && (
        <div className="category-stats-grid">
          {DRINK_CARDS.map((card) => (
            <div
              key={card.key}
              className="category-card"
              onClick={() => setSelectedCategory(card.key)}
              style={{ cursor: "pointer" }}
            >
              <div className="cat-icon-wrapper">{card.icon}</div>
              <div className="cat-title">{card.label}</div>
              <div className="cat-count">{card.value}</div>
              <div className="cat-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE */}
      {selectedCategory && (
        <>
          <h2 className="existing-title">{selectedCategory} drinks</h2>

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
                    <td colSpan={8} style={{ textAlign: "center", padding: 16 }}>
                      No drinks for this category yet.
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
                      <td className="favorites-cell">
                        {item.favorites ?? 0}
                      </td>
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

export default DrinksDash;
