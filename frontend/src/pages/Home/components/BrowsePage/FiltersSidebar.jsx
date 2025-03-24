import React from 'react';
import { FaTimes } from 'react-icons/fa';

const FiltersSidebar = ({ showFilters, setShowFilters, filters, onFilterChange }) => {
  return (
    <div
      className={`bg-white shadow-lg p-6 w-64 h-screen fixed top-0 left-0 transform transition-all ease-in-out duration-300 ${
        showFilters ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        onClick={() => setShowFilters(false)}
        className="absolute top-4 right-4 text-xl text-gray-600"
      >
        <FaTimes />
      </button>
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      {/* Load Type Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Load Type</p>
        <div className="flex flex-wrap gap-2">
          {['General Freight', 'Heavy Equipment', 'Temperature Controlled'].map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange('loadType', type)}
              className={`px-4 py-2 rounded-lg border-2 text-sm text-gray-800 ${
                filters.loadType === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Max Weight Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Max Weight (kg)</p>
        <input
          type="number"
          value={filters.maxWeight}
          onChange={(e) => onFilterChange('maxWeight', e.target.value)}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
          placeholder="Enter max weight"
        />
      </div>

      {/* Pickup Location Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Pickup Location</p>
        <input
          type="text"
          value={filters.pickupLocation}
          onChange={(e) => onFilterChange('pickupLocation', e.target.value)}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
          placeholder="Enter pickup location"
        />
      </div>

      {/* Destination Filter */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Destination</p>
        <input
          type="text"
          value={filters.destination}
          onChange={(e) => onFilterChange('destination', e.target.value)}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
          placeholder="Enter destination"
        />
      </div>
    </div>
  );
};

export default FiltersSidebar;
