import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/Css/style.css";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        setResults(data || []);
      } catch (err) {
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);
  

  return (
    <div className="search-results-page">
      <h2 className="search-results-heading">
        Results for: <em>"{query}"</em>
      </h2>

      {loading && <p className="search-loading">Loading...</p>}
      {error && <p className="search-error" style={{ color: 'red' }}>{error}</p>}

      <div className="row">
        {results.length > 0 ? (
          results.map((item, idx) => (
            <div key={idx} className="card">
              {item.image && (
  <img src={`http://localhost:5000/${item.image}`} alt="recipe" />



         
              )}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                {item.description && (
                  <p className="card-text">{item.description}</p>
                )}
                {/* Mund të lidhet me një faqe të detajuar nëse e ke */}
                <a href="#" className="recipe-button">View Recipe</a>
              </div>
            </div>
          ))
        ) : (
          !loading && <p style={{ textAlign: 'center' }}>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
