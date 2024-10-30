import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleSearch();
    }
  }

  return (
    <header>
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </header>
  );
};

export default Header;
