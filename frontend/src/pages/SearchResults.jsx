import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/Css/style.css";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search?q=${query}`);
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        setResults(data); // ← backend kthen array direkt
      } catch (err) {
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchData();
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
