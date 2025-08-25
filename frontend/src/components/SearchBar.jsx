import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        style={{ marginRight: '8px', fontSize: '20px', cursor: 'pointer' }}
      >
        🔍
      </button>
      {visible && (
        <>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            autoFocus
            style={{ padding: '5px' }}
          />
          <button type="submit" style={{ marginLeft: '5px' }}>
            Go
          </button>
        </>
      )}
    </form>
  );
};

export default SearchBar;
