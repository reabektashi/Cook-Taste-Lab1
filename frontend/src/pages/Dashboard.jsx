// src/pages/Dashboard.jsx
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
} from "react-icons/fa";

import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {
  // klasë për linkun aktiv
  const navClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

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
          {/* OVERVIEW */}
          <NavLink to="/dashboard" end className={navClass}>
            <FaHome />
            <span>Overview</span>
          </NavLink>

          {/* REPORTS */}
          <NavLink to="/dashboard/reports" className={navClass}>
            <FaChartBar />
            <span>Reports</span>
          </NavLink>

          {/* CATEGORIES */}
          <NavLink to="/dashboard/categories" className={navClass}>
            <FaListUl />
            <span>Categories</span>
          </NavLink>

          {/* DRINKS */}
          <NavLink to="/dashboard/drinks" className={navClass}>
            <FaWineGlassAlt />
            <span>Drinks</span>
          </NavLink>

          {/* USERS */}
          <NavLink to="/dashboard/users" className={navClass}>
            <FaUsers />
            <span>Users</span>
          </NavLink>

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
        {/* top header – i përbashkët për krejt faqet */}
        <header className="admin-header">
          <div>
            <h2 className="admin-title">Admin Dashboard</h2>
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

        {/* KËTU FUTET FAQJA KONKRETE: Overview, Reports, Categories, Drinks, Users */}
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
