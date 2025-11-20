import React, { useState, useEffect } from "react";
import "../assets/Css/dashboard.css";
import { FaHeart } from "react-icons/fa";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Desserts", "Appetizers"];

// Change if your backend runs on a different port
const API_BASE = "http://localhost:5174";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch items from backend whenever we pick a category
  useEffect(() => {
    if (!selectedCategory) return; // don't fetch on first load

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

      {/* CATEGORY BUTTONS */}
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

      {/* ONLY SHOW TABLE AFTER A CATEGORY IS CLICKED */}
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
                      colSpan={9}
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
