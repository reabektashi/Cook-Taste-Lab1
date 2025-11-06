import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import '../assets/Css/style.css';
import { FaSignOutAlt } from "react-icons/fa";

function Layout() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-brand" to="/">
            <img src="/Images/brandL.png" alt="Cook & Taste Logo" />
          </Link>

          <div className="navbar-links" id="navbarLinks">
            <ul className="navbar-nav">
              <li><Link className="nav-link" to="/">Home</Link></li>

              <li className="dropdown">
                <span className="nav-link">Recipes</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/recipes/breakfast">Breakfast</Link></li>
                  <li><Link className="dropdown-item" to="/recipes/lunch">Lunch</Link></li>
                  <li><Link className="dropdown-item" to="/recipes/dinner">Dinner</Link></li>
                  <li><Link className="dropdown-item" to="/recipes/desserts">Desserts</Link></li>
                  <li><Link className="dropdown-item" to="/recipes/appetizers">Appetizers</Link></li>
                </ul>
              </li>

              <li><Link className="nav-link" to="/drinks">Drinks</Link></li>
              <li><Link className="nav-link" to="/aboutus">About</Link></li>

              {localStorage.getItem("role") === "admin" && (
                <li><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              )}
            </ul>
          </div>

          <div className="search-container">
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                id="searchInput"
                placeholder="Search Recipes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" id="searchIcon" style={{ border: 'none', background: 'none' }}>
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>

          <div className="icons" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Favorites */}
            <Link to="/favorites" title="Favorites" className="nav-link">
              <i className="fa fa-heart" style={{ fontSize: "20px" }}></i>
            </Link>

            {/* Logout OR Login */}
            {localStorage.getItem("role") ? (
              <Link to="/logout" title="Logout" className="nav-link" style={{ fontSize: "20px" }}>
                <FaSignOutAlt />
              </Link>
            ) : (
              <Link to="/login" title="Login" className="nav-link">
                <i className="fa fa-user" style={{ fontSize: "20px" }}></i>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="main-wrapper" style={{ minHeight: '70vh' }}>
        <Outlet /> {/* 👈 THIS renders the current page */}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            {/* Col 1: policies */}
            <div className="footer-col footer-left">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>

            {/* Col 2: email + social */}
            <div className="footer-col footer-center">
              <a href="mailto:info@cooktaste.com">info@cooktaste.com</a>
              <div className="footer-social" aria-label="Social links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                  <i className="fab fa-x" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>

            {/* Col 3: phone + location */}
            <div className="footer-col footer-right">
              <p><a href="tel:+38349460555">+383 49 460 555</a></p>
              <p>Prishtina, Kosovo</p>
            </div>
          </div>

          <div className="footer-bottom">
            © 2025 Cook&Taste. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
