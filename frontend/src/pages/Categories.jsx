import React, { useState } from "react";
import { FaListUl, FaPlus } from "react-icons/fa";
import "../assets/Css/dashboard.css";

const INITIAL_CATEGORIES = [
  { id: 1, name: "Breakfast", description: "Quick and easy morning recipes" },
  { id: 2, name: "Lunch", description: "Light and tasty mid-day meals" },
  { id: 3, name: "Dinner", description: "Hearty mains for the evening" },
  { id: 4, name: "Desserts", description: "Sweet treats & baking" },
];

export default function Categories() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;

    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        description: description.trim() || "Custom category",
      },
    ]);
    setName("");
    setDescription("");
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>
          <FaListUl style={{ marginRight: 8 }} />
          Categories
        </h1>
        <p>Organize your Cook&amp;Taste recipes into meaningful groups.</p>
      </header>

      {/* Add new category */}
      <section className="admin-form-card">
        <h2>
          <FaPlus style={{ marginRight: 6 }} />
          Add new category
        </h2>
        <form className="admin-form-grid" onSubmit={handleAdd}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              placeholder="e.g. Snacks"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Add category
            </button>
          </div>
        </form>
      </section>

      {/* List of existing categories */}
      <section className="admin-table-section">
        <h2>Existing categories</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, idx) => (
                <tr key={c.id}>
                  <td>{idx + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="admin-table-subtitle">
          Later you can connect this page to your real categories table in MySQL.
        </p>
      </section>
    </div>
  );
}
