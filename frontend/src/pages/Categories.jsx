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
    value: 12, // change these numbers however you like
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

  // Fetch items when a category button is clicked
  useEffect(() => {
    if (!selectedCategory) return; // don't fetch on initial load

    async function fetchItems() {
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
    }

    fetchItems();
  }, [selectedCategory]);

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
      </div>

      {/* CATEGORY BUTTONS (same as before) */}
      <div className="category-buttons-full">
        {CATEGORIES.map((cat) => (
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

      {/* STATIC CARDS UNDER BUTTONS (3 on top row, 2 on bottom) */}
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

      {/* TABLE – only after a button is clicked */}
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

export default Categories;
