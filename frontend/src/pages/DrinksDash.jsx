import React, { useState } from "react";
import { FaWineGlassAlt, FaSearch } from "react-icons/fa";
import "../assets/Css/dashboard.css";

const MOCK_DRINKS = [
  { id: 1, name: "Strawberry Smoothie", type: "Smoothie", difficulty: "Easy" },
  { id: 2, name: "Iced Caramel Latte", type: "Coffee", difficulty: "Medium" },
  { id: 3, name: "Mojito Mocktail", type: "Mocktail", difficulty: "Medium" },
  { id: 4, name: "Hot Chocolate", type: "Chocolate", difficulty: "Easy" },
];

export default function Drinks() {
  const [query, setQuery] = useState("");

  const filtered = MOCK_DRINKS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>
          <FaWineGlassAlt style={{ marginRight: 8 }} />
          Drinks
        </h1>
        <p>Manage the drinks section of your platform.</p>
      </header>

      {/* Search bar */}
      <section className="admin-form-card">
        <div className="admin-form-grid">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Search drinks</label>
            <div className="input-with-icon">
              <FaSearch />
              <input
                type="text"
                placeholder="Type a drink name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* List of drinks */}
      <section className="admin-table-section">
        <h2>Drinks list</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Drink</th>
                <th>Type</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, idx) => (
                <tr key={d.id}>
                  <td>{idx + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.type}</td>
                  <td>{d.difficulty}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: 16 }}>
                    No drinks match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="admin-table-subtitle">
          Later you can link this to a <code>drinks</code> table in MySQL.
        </p>
      </section>
    </div>
  );
}
