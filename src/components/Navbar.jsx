import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { PiListStarBold } from 'react-icons/pi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const searchRef = useRef(); // Ref to handle clicks outside of search results

  // Sample data for demonstration
  const sampleData = [
    'Fresh Apples',
    'Organic Bananas',
    'Carrots',
    'Potatoes',
    'Tomatoes',
    'Local Honey',
    'Farm Eggs',
  ];

  // Handle Search
  const handleSearch = () => {
    const filteredResults = sampleData.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  // Clear search results if query is empty
  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
    } else {
      handleSearch();
    }
  }, [searchQuery]);

  // Handle clicks outside of search results to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]); // Close search results
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-green-500 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold italic font-serif text-black">
          <NavLink to="/">Farmer's Market</NavLink>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex relative w-1/3" ref={searchRef}>
          <input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 rounded-full border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <FaSearch />
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <NavLink to="/Home" className="py-2 text-black-700 hover:text-white">
            Home
          </NavLink>
          <NavLink to="/about" className="py-2 text-black-700 hover:text-white">
            About
          </NavLink>
          <NavLink to="/services" className="py-2 text-black-700 hover:text-white">
            Services
          </NavLink>
          <NavLink to="/contact" className="py-2 text-black-700 hover:text-white">
            Contact
          </NavLink>
          <NavLink to="/MyAccount" className="py-2 text-black-700 hover:text-white">
            MyAccount
          </NavLink>

          {/* Login Icon */}
          <NavLink to="/login" className="flex items-center space-x-2 text-black-600 hover:text-white">
            <FaUser className="h-6 w-6" />
            <span className="hidden lg:block">Login</span>
          </NavLink>

          {/* Cart Icon */}
          <NavLink to="/cart" className="relative text-black-600 hover:text-white">
            <FaShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </NavLink>

          {/* Wishlist Icon */}
          <NavLink to="/wishlist" className="relative ml-4 text-black-600 hover:text-white">
            <PiListStarBold className="h-6 w-6" />
          </NavLink>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="absolute left-0 right-0 bg-white text-black shadow-lg mt-2 rounded-lg z-10">
          <ul className="py-2">
            {searchResults.map((result, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-200">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
