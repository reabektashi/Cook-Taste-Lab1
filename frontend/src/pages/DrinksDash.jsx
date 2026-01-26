import React, { useEffect, useState } from "react";
import "../assets/Css/dashboard.css";
import { FaHeart } from "react-icons/fa";
import { MdLocalBar, MdNoDrinks, MdCoffee, MdBlender } from "react-icons/md";
import { GiOrange } from "react-icons/gi";
import API from "../api"; // ✅ your axios instance

const DRINK_CATEGORIES = ["Cocktails", "Mocktails", "Smoothies", "Coffee", "Juices"];

const DRINK_CARDS = [
  {
    key: "Cocktails",
    label: "COCKTAILS",
    desc: "Alcoholic mixed drinks",
    icon: <MdLocalBar className="cat-icon" />,
  },
  {
    key: "Mocktails",
    label: "MOCKTAILS",
    desc: "Non-alcoholic drinks",
    icon: <MdNoDrinks className="cat-icon" />,
  },
  {
    key: "Smoothies",
    label: "SMOOTHIES",
    desc: "Blended fruit drinks",
    icon: <MdBlender className="cat-icon" />,
  },
  {
    key: "Coffee",
    label: "COFFEE",
    desc: "Hot & cold coffee",
    icon: <MdCoffee className="cat-icon" />,
  },
  {
    key: "Juices",
    label: "JUICES",
    desc: "Fresh juice drinks",
    icon: <GiOrange className="cat-icon" />,
  },
];

function DrinksDash() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // ✅ dynamic counts
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  // ✅ modal
  const [openModal, setOpenModal] = useState(false);

  const emptyForm = {
    category: "",
    card_id: "",
    title: "",
    tag: "",
    time_label: "",
    img_url: "",
    href: "",
  };
  const [form, setForm] = useState(emptyForm);

  // ---------------------------
  // ✅ fetch counts for cards
  // ---------------------------
  const fetchCounts = async () => {
    setLoadingCounts(true);
    try {
      const results = await Promise.all(
        DRINK_CATEGORIES.map(async (cat) => {
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
  }, []);

  // ---------------------------
  // ✅ fetch items for selected category
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
        console.error("Fetch drinks error:", err);
        setItems([]);
      } finally {
        setLoadingItems(false);
      }
    })();
  }, [selectedCategory]);

  // ---------------------------
  // ✅ modal helpers
  // ---------------------------
  const openAddModal = () => {
    setForm({ ...emptyForm, category: selectedCategory || "" });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.category || !form.title.trim()) return;

    try {
      await API.post(
        "/category-items",
        {
          category: form.category,
          card_id: form.card_id || null, // IMPORTANT if you want favs count to work
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
      console.error("Save drink error:", err);
      alert("Save failed (check admin login / API).");
    }
  };

  return (
    <div className="categories-page">
      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Drinks</h1>
          <p className="admin-subtitle">Organize drinks recipes by category.</p>
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
                  {DRINK_CATEGORIES.map((c) => (
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
                  placeholder="ex: 91"
                />
              </label>

              <label style={{ gridColumn: "1 / -1" }}>
                Title *
                <input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Drink title"
                />
              </label>

              <label>
                Tag
                <input
                  value={form.tag}
                  onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                  placeholder="ex: SUMMER"
                />
              </label>

              <label>
                Time Label
                <input
                  value={form.time_label}
                  onChange={(e) => setForm((p) => ({ ...p, time_label: e.target.value }))}
                  placeholder="ex: 5 mins"
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
                  placeholder="/drinks/some-slug"
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
        {DRINK_CATEGORIES.map((cat) => (
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
          {DRINK_CARDS.map((card) => (
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
          <h2 className="existing-title">{selectedCategory} drinks</h2>

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

export default DrinksDash;
