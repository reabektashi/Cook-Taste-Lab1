  // src/pages/DrinksDash.jsx
  import React, { useEffect, useState } from "react";
  import "../assets/Css/dashboard.css";
  import { FaHeart } from "react-icons/fa";
  import { MdLocalBar, MdNoDrinks, MdCoffee, MdBlender, MdOutlineLocalCafe } from "react-icons/md";
  import { GiOrange } from "react-icons/gi";
  import API from "../api";

  const DRINK_CATEGORIES = ["Cocktails", "Mocktails", "Smoothies", "Coffee", "Tea", "Juices"];

  const DRINK_CARDS = [
    { key: "Cocktails", label: "COCKTAILS", desc: "Alcoholic mixed drinks", icon: <MdLocalBar className="cat-icon" /> },
    { key: "Mocktails", label: "MOCKTAILS", desc: "Non-alcoholic drinks", icon: <MdNoDrinks className="cat-icon" /> },
    { key: "Smoothies", label: "SMOOTHIES", desc: "Blended fruit drinks", icon: <MdBlender className="cat-icon" /> },
    { key: "Coffee", label: "COFFEE", desc: "Hot & cold coffee", icon: <MdCoffee className="cat-icon" /> },
    { key: "Tea", label: "TEA", desc: "Hot & iced teas", icon: <MdOutlineLocalCafe className="cat-icon" /> },
    { key: "Juices", label: "JUICES", desc: "Fresh juice drinks", icon: <GiOrange className="cat-icon" /> },
  ];

  function DrinksDash() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [items, setItems] = useState([]);
    const [loadingItems, setLoadingItems] = useState(false);

    const [counts, setCounts] = useState({});
    const [loadingCounts, setLoadingCounts] = useState(true);

    const [openModal, setOpenModal] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const emptyForm = {
      category: "",
      title: "",
      tag: "",
      time_label: "",
      img_url: "",
      href: "",
    };
    const [form, setForm] = useState(emptyForm);

    // ✅ image validation helper
    const isValidImageUrl = (value) => {
      if (!value) return true; // allow empty
      return /\.(jpe?g|png|webp|gif|svg)(\?.*)?$/i.test(String(value).trim());
    };

    // ✅ fetch counts (admin route -> needs cookies)
    const fetchCounts = async () => {
      setLoadingCounts(true);
      try {
        const res = await API.get("/category-items/counts", { withCredentials: true });
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

    // ✅ fetch items for selected category (public)
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

    // ✅ add OR edit (admin routes -> needs cookies)
    const handleSave = async () => {
      if (!form.category || !form.title.trim()) return;

      // ✅ validate time_label (digits only)
      if (form.time_label && !/^\d+$/.test(form.time_label)) {
        alert("Time must be a number (minutes only).");
        return;
      }

      // ✅ validate image url extension
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
          await API.put(`/category-items/${editingId}`, payload, { withCredentials: true });
        } else {
          await API.post("/category-items", payload, { withCredentials: true });
        }

        closeModal();
        await refreshItems();
        fetchCounts();
      } catch (err) {
        console.error(isEditing ? "Edit drink error:" : "Save drink error:", err);
        console.log("STATUS:", err?.response?.status);
        console.log("DATA:", err?.response?.data);
        alert("Operation failed (check admin login / cookies).");
      }
    };

    // ✅ delete (admin route -> needs cookies)
    const handleDelete = async (item) => {
      const ok = window.confirm(`Delete "${item.title}"?`);
      if (!ok) return;

      try {
        await API.delete(`/category-items/${item.id}`, { withCredentials: true });
        await refreshItems();
        fetchCounts();
      } catch (err) {
        console.error("Delete drink error:", err);
        console.log("STATUS:", err?.response?.status);
        console.log("DATA:", err?.response?.data);
        alert("Delete failed (check admin login / cookies).");
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

        {/* ✅ ADD/EDIT MODAL */}
        {openModal && (
          <div className="modal-backdrop" onMouseDown={closeModal}>
            <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h2 className="modal-title">{isEditing ? "Edit Drink" : "Add Drink"}</h2>
                <button className="modal-close" type="button" onClick={closeModal}>
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
                  Time (minutes)
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="1"
                    value={form.time_label}
                    onChange={(e) => {
                      const digitsOnly = String(e.target.value).replace(/[^\d]/g, "");
                      setForm((p) => ({ ...p, time_label: digitsOnly }));
                    }}
                    placeholder="ex: 5"
                  />
                </label>

                <label style={{ gridColumn: "1 / -1" }}>
                  Image URL
                  <input
                    type="text"
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
          {DRINK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={"category-btn-full" + (selectedCategory === cat ? " active" : "")}
              onClick={() => setSelectedCategory(cat)}
              type="button"
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

  export default DrinksDash;
