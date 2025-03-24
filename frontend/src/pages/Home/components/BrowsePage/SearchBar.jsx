import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchBar = ({ searchQuery, onSearchChange, onToggleFilters }) => {
  return (
    <div className="relative max-w-md mx-auto mb-8 flex items-center gap-4">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        className="w-full border p-3 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Search loads..."
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />

      <button
        onClick={onToggleFilters}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all"
      >
        <FaFilter /> Filters
      </button>
    </div>
  );
};

export default SearchBar;
