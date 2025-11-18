// src/pages/Reports.jsx
import React, { useState } from "react";
import {
  FaChartBar,
  FaUtensils,
  FaUsers,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";
import "../assets/Css/dashboard.css";

const TOP_RECIPES = [
  { id: 1, title: "Creamy Chicken Alfredo", category: "Dinner", rating: 4.9, favorites: 56 },
  { id: 2, title: "Berry Smoothie Bowl", category: "Breakfast", rating: 4.8, favorites: 41 },
  { id: 3, title: "Iced Caramel Latte", category: "Drinks", rating: 4.7, favorites: 37 },
];

const WEEK_ACTIVITY = [
  { label: "Sun", recipes: 3, users: 2 },
  { label: "Mon", recipes: 5, users: 4 },
  { label: "Tue", recipes: 2, users: 3 },
  { label: "Wed", recipes: 6, users: 5 },
  { label: "Thu", recipes: 4, users: 3 },
  { label: "Fri", recipes: 3, users: 2 },
  { label: "Sat", recipes: 1, users: 1 },
];

export default function Reports() {
  const [period, setPeriod] = useState("7days");

  // fake stats for now – later you can replace with real API data
  const stats = {
    recipes: 42,
    users: 123,
    subscribers: 60,
    avgRating: 4.3,
  };

  return (
  <div className="reports-page">

  <div className="reports-header">
      <div>
        <h1 className="reports-title">
          <FaChartBar className="reports-title-icon" />
          Reports
        </h1>

        <p className="reports-subtitle">
          Key performance metrics for your Cook&Taste platform.
        </p>
      </div>

      <div className="reports-filter">
        <span>Period</span>
        <select>
          <option>Last 7 days</option>
          <option>Last 14 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
  </div>


      

      {/* MAIN TWO-COLUMN AREA */}
      <section className="reports-main-grid">
        {/* LEFT: TOP RECIPES TABLE */}
        <div className="reports-panel">
          <div className="reports-panel-header">
            <h2>Top performing recipes</h2>
            <span className="reports-panel-caption">
              Based on favorites and rating (dummy data for now).
            </span>
          </div>

          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipe</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>Favorites</th>
                </tr>
              </thead>
              <tbody>
                {TOP_RECIPES.map((r, index) => (
                  <tr key={r.id}>
                    <td>{index + 1}</td>
                    <td>{r.title}</td>
                    <td>{r.category}</td>
                    <td>{r.rating.toFixed(1)}</td>
                    <td>{r.favorites}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: SIMPLE "CHART" USING BARS */}
        <div className="reports-panel">
          <div className="reports-panel-header">
            <h2>Weekly activity</h2>
            <span className="reports-panel-caption">
              New recipes and users by day.
            </span>
          </div>

          <div className="reports-chart-legend">
            <span className="legend-item">
              <span className="legend-dot recipes" /> Recipes
            </span>
            <span className="legend-item">
              <span className="legend-dot users" /> Users
            </span>
          </div>

          <div className="reports-chart">
            {WEEK_ACTIVITY.map((d) => (
              <div key={d.label} className="reports-chart-column">
                <div
                  className="bar recipes"
                  style={{ height: `${d.recipes * 14}px` }}
                />
                <div
                  className="bar users"
                  style={{ height: `${d.users * 14}px` }}
                />
                <span className="reports-chart-label">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM PANEL – EMAIL / NEWSLETTER */}
      <section className="reports-bottom">
        <div className="reports-panel wide">
          <div className="reports-panel-header">
            <h2>Newsletter performance</h2>
            <span className="reports-panel-caption">
              Use these insights to improve your recipe campaigns.
            </span>
          </div>

          <div className="reports-bottom-grid">
            <div>
              <h3>Total subscribers</h3>
              <p className="reports-bottom-number">{stats.subscribers}</p>
            </div>
            <div>
              <h3>Estimated open rate</h3>
              <p className="reports-bottom-number">42%</p>
            </div>
            <div>
              <h3>Top segment</h3>
              <p className="reports-bottom-number">Dinner</p>
            </div>
            <div>
              <h3>Suggested next step</h3>
              <p className="reports-bottom-text">
                Try sending a weekly “Quick Dinner Ideas” collection to your
                most active subscribers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
