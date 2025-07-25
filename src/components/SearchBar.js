import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, darkMode }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={darkMode ? 'dark' : ''}
      />
    </div>
  );
};

export default SearchBar;