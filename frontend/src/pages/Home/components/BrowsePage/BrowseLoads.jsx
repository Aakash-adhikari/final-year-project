import React, { useState, useEffect } from 'react';
import { FaTruck, FaFilter, FaSearch, FaEye, FaTimes } from 'react-icons/fa';
import FiltersSidebar from './FiltersSidebar';
import SearchBar from './SearchBar';
import LoadCard from './LoadCard';

const BrowseLoads = () => {
  const [loads, setLoads] = useState([]);
  const [filters, setFilters] = useState({
    loadType: '',
    maxWeight: '',
    pickupLocation: '',
    destination: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data for demonstration
  useEffect(() => {
    setLoads([
      {
        id: 1,
        title: 'Electronics from Kathmandu to Pokhara',
        loadType: 'General Freight',
        weight: 300,
        pickupLocation: 'Kathmandu',
        destination: 'Pokhara',
        description: 'Electronics to be transported securely.',
        contactInfo: 'John Doe, johndoe@example.com',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        title: 'Heavy Equipment from Bhaktapur to Chitwan',
        loadType: 'Heavy Equipment',
        weight: 5000,
        pickupLocation: 'Bhaktapur',
        destination: 'Chitwan',
        description: 'Construction equipment, needs a large transporter.',
        contactInfo: 'Jane Smith, janesmith@example.com',
        image: 'https://via.placeholder.com/150',
      },
      // Add more sample loads...
    ]);
  }, []);

  // Filter handler
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Search handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the loads based on the selected filters and search query
  const filteredLoads = loads
    .filter((load) =>
      load.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((load) => {
      return (
        (filters.loadType ? load.loadType === filters.loadType : true) &&
        (filters.maxWeight ? load.weight <= filters.maxWeight : true) &&
        (filters.pickupLocation
          ? load.pickupLocation.includes(filters.pickupLocation)
          : true) &&
        (filters.destination
          ? load.destination.includes(filters.destination)
          : true)
      );
    });

  return (
    <div className="flex">
      {/* Sidebar (Sidenav) */}
      <FiltersSidebar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${showFilters ? 'ml-64' : 'ml-0'}`}
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Browse Available Loads</h1>
            <p className="text-lg mb-6">Find available loads to transport and submit your bids.</p>

            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} onToggleFilters={() => setShowFilters(!showFilters)} />
          </div>
        </section>

        {/* Loads Display Section */}
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {filteredLoads.length === 0 ? (
              <p className="text-center text-lg font-semibold text-gray-700">
                No loads found with the current filters.
              </p>
            ) : (
              filteredLoads.map((load) => (
                <LoadCard key={load.id} load={load} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrowseLoads;
