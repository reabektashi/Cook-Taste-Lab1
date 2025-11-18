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
import { useNavigate, useLocation, Outlet } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-shell">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">CT</div>
          <div className="admin-brand-text">
            <span className="brand-name">Cook&Taste</span>
            <span className="brand-tag">Admin</span>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            <FaHome />
            <span>Overview</span>
          </button>

          <button
            className={`nav-item ${
              isActive("/dashboard/reports") ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard/reports")}
          >
            <FaChartBar />
            <span>Reports</span>
          </button>

          <button
            className={`nav-item ${
              isActive("/dashboard/categories") ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard/categories")}
          >
            <FaListUl />
            <span>Categories</span>
          </button>

          <button
            className={`nav-item ${
              isActive("/dashboard/drinksdash") ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard/drinksdash")}
          >
            <FaWineGlassAlt />
            <span>Drinks</span>
          </button>

          <button
            className={`nav-item ${
              isActive("/dashboard/users") ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard/users")}
          >
            <FaUsers />
            <span>Users</span>
          </button>

          <div className="nav-divider" />

          <button
            className={`nav-item ${
              isActive("/dashboard/settings") ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard/settings")}
          >
            <FaCog />
            <span>Settings</span>
          </button>

          <button className="nav-item logout">
            <FaSignOutAlt />
            <span>Log out</span>
          </button>
        </nav>
      </aside>

      {/* MAIN AREA – each page renders here */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
