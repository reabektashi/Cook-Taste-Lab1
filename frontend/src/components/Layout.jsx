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
      <nav className="ct-navbar">
        <div className="ct-navbar-container">
          <Link className="ct-navbar-brand" to="/">
            <img src="/Images/brandL.png" alt="Cook & Taste Logo" />
          </Link>

          <div className="ct-navbar-links" id="navbarLinks">
            <ul className="ct-navbar-nav">
              <li><Link className="ct-nav-link" to="/">Home</Link></li>

              <li className="ct-dropdown">
                <span className="ct-nav-link">Recipes</span>
                <ul className="ct-dropdown-menu">
                  <li><Link className="ct-dropdown-item" to="/recipes/breakfast">Breakfast</Link></li>
                  <li><Link className="ct-dropdown-item" to="/recipes/lunch">Lunch</Link></li>
                  <li><Link className="ct-dropdown-item" to="/recipes/dinner">Dinner</Link></li>
                  <li><Link className="ct-dropdown-item" to="/recipes/desserts">Desserts</Link></li>
                  <li><Link className="ct-dropdown-item" to="/recipes/appetizers">Appetizers</Link></li>
                </ul>
              </li>

              <li><Link className="ct-nav-link" to="/drinks">Drinks</Link></li>
              <li><Link className="ct-nav-link" to="/aboutus">About</Link></li>

              {localStorage.getItem("role") === "admin" && (
                <li><Link className="ct-nav-link" to="/dashboard">Dashboard</Link></li>
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
            <Link to="/favorites" title="Favorites" className="ct-nav-link">
              <i className="fa fa-heart" style={{ fontSize: "20px" }}></i>
            </Link>

            {/* Logout OR Login */}
            {localStorage.getItem("role") ? (
            <Link to="/logout" title="Logout" style={{ fontSize: "20px" }} className="ct-nav-link logout-icon">
            <FaSignOutAlt />
           </Link>

            ) : (
              <Link to="/login" title="Login" className="ct-nav-link">
                <i className="fa fa-user" style={{ fontSize: "20px" }}></i>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="main-wrapper" style={{ minHeight: '70vh' }}>
        <Outlet />
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-col footer-left">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>

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
