import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../assets/Css/style.css';
import { FaSignOutAlt } from "react-icons/fa";


function Layout({ children }) {
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
      <div className="main-wrapper">
        {children}
      </div>

      {/* FOOTER */}
      <footer>
        <div className="social-icon">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://x.com/" target="_blank" rel="noreferrer"><i className="fab fa-x"></i></a>
          <a href="https://al.linkedin.com/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <p>© 2024 Cook&Taste. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Layout;
