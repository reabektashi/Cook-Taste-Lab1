// src/pages/Dashboard.jsx
// Më vonë, kur të jesh gati me backend, thjesht kthen prapë useEffect + useState dhe e heq stats e fort-koduara.
import React from "react";
import "../assets/Css/dashboard.css";
import {
  FaHome,
  FaChartBar,
  FaListUl,
  FaWineGlassAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaUtensils,
  FaEnvelope,
} from "react-icons/fa";

// ⬇⬇ KJO ËSHTË SHTESA E VETME QË NA DUHET
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate(); // inicializojmë navigate

  // STATISTIKA FIKTIVE – VEC PER FRONTEND
  const stats = {
    recipes: 42,
    categories: 8,
    drinks: 15,
    users: 123,
    subscribers: 60,
  };

  return (
    <div className="admin-shell">
      {/* ===== SIDEBAR ===== */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">CT</div>
          <div className="admin-brand-text">
            <span className="brand-name">Cook&Taste</span>
            <span className="brand-tag">Admin</span>
          </div>
        </div>

        <nav className="admin-nav">
          {/* OVERVIEW – veç e lëmë aktive siç e ke pas */}
          <button
            className="nav-item active"
            onClick={() => navigate("/dashboard")}
          >
            <FaHome />
            <span>Overview</span>
          </button>

          {/* REPORTS – KËTU E BOJM NAVIGIMIN */}
          <button
            className="nav-item"
            onClick={() => navigate("/dashboard/reports")}
          >
            <FaChartBar />
            <span>Reports</span>
          </button>

          {/* Këto tjerat mund t’i lidhësh më vonë kur t’i kesh faqet gati */}
          <button className="nav-item">
            <FaListUl />
            <span>Categories</span>
          </button>

          <button className="nav-item">
            <FaWineGlassAlt />
            <span>Drinks</span>
          </button>

          <button className="nav-item">
            <FaUsers />
            <span>Users</span>
          </button>

          <div className="nav-divider" />

          <button className="nav-item">
            <FaCog />
            <span>Settings</span>
          </button>

          <button className="nav-item logout">
            <FaSignOutAlt />
            <span>Log out</span>
          </button>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="admin-main">
        {/* top header */}
        <header className="admin-header">
          <div>
            <h2 className="admin-title"> Admin Dashboard</h2>
            <p className="admin-subtitle">
              Overview of your Cook&Taste platform
            </p>
          </div>

          <div className="admin-filter">
            <span>Filter</span>
            <select>
              <option>This week</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>
        </header>

        {/* ===== top stat cards ===== */}
        <section className="admin-cards-row">
          <div className="stat-card">
            <div className="stat-icon icon-recipes">
              <FaUtensils />
            </div>
            <div className="stat-label">Recipes</div>
            <div className="stat-value">{stats.recipes}</div>
            <p className="stat-caption">Total recipes in the platform</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-categories">
              <FaListUl />
            </div>
            <div className="stat-label">Categories</div>
            <div className="stat-value">{stats.categories}</div>
            <p className="stat-caption">
              Breakfast, lunch, dinner, desserts…
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-drinks">
              <FaWineGlassAlt />
            </div>
            <div className="stat-label">Drinks</div>
            <div className="stat-value">{stats.drinks}</div>
            <p className="stat-caption">Smoothies, cocktails & more</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-users">
              <FaUsers />
            </div>
            <div className="stat-label">Users</div>
            <div className="stat-value">{stats.users}</div>
            <p className="stat-caption">Registered accounts</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-subs">
              <FaEnvelope />
            </div>
            <div className="stat-label">Subscribers</div>
            <div className="stat-value">{stats.subscribers}</div>
            <p className="stat-caption">Newsletter sign-ups</p>
          </div>
        </section>

        {/* ===== SUMMARY + SIDEBAR RIGHT ===== */}
        <section className="admin-bottom">
          {/* Summary card */}
          <div className="summary-card">
            <div className="summary-header">
              <h2>Summary</h2>
              <span className="summary-period">Last 7 days</span>
            </div>

            <div className="summary-substats">
              <div>
                <span className="summary-label">New recipes</span>
                <strong>{Math.max(1, Math.round(stats.recipes / 6))}</strong>
              </div>
              <div>
                <span className="summary-label">New users</span>
                <strong>{Math.max(1, Math.round(stats.users / 8))}</strong>
              </div>
              <div>
                <span className="summary-label">New subscribers</span>
                <strong>
                  {Math.max(1, Math.round(stats.subscribers / 10))}
                </strong>
              </div>
            </div>

            <div className="summary-chart">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="chart-col">
                  <div
                    className="chart-bar"
                    style={{ height: `${40 + (i % 4) * 12}px` }}
                  />
                  <span className="chart-label">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter side card */}
          <div className="side-card">
            <h3 className="side-title">Newsletter snapshot</h3>
            <ul className="side-list">
              <li>
                <span>Total subscribers</span>
                <strong>{stats.subscribers}</strong>
              </li>
              <li>
                <span>Open rate (est.)</span>
                <strong>42%</strong>
              </li>
              <li>
                <span>Top segment</span>
                <strong>Dinner lovers</strong>
              </li>
            </ul>
            <p className="side-foot">
              Use these insights to plan your next recipe drops and campaigns.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
