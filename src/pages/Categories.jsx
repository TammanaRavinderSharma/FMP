import React, { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa"; // Cart icon
import { IoFilter } from "react-icons/io5"; // Filter icon
import { NavLink } from "react-router-dom";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Fruits",
    "Vegetables",
    "Grains",
    "Milk Products",
  ];

  const products = [
    { id: 1, name: "Fresh Mangoes", category: "Fruits", price: "₹80/kg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr2fGuHb2HRTfoVawM5E5q_Mw6BgmhZa__Eg&s" },
    { id: 2, name: "Organic Spinach", category: "Vegetables", price: "₹50/bundle", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyt_vuaGTi82qopFHXcT1Afh4Dft662FGkw&s" },
    { id: 3, name: "Cow Milk", category: "Milk Products", price: "₹60/L", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShu7nSW1WZKGdA6ubbPw3L1FAbbv8ZLE1WOQ&s" },
    { id: 4, name: "Juicy Watermelons", category: "Fruits", price: "₹40/unit", image: "https://img.freepik.com/premium-photo/fresh-juicy-watermelon-slices-perfect-summer-refreshments-healthy-fruit-platters_1287927-5195.jpg" },
    { id: 5, name: "Masoor Dal", category: "Grains", price: "₹63 (500 g)", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwuE25i_1uKWV9eSTSAFrjITgg9aEcs-AUJw&s" },
  ];

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Filter */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">Product Marketplace</h1>

        {/* Category Filter Dropdown */}
        <div className="relative">
          <button className="bg-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
            <IoFilter className="text-lg" />
            <span>{selectedCategory}</span>
          </button>
          <div className="absolute bg-gray-700 rounded-lg shadow-md mt-2 w-48 hidden group-hover:block">
            {categories.map((category) => (
              <button
                key={category}
                className="w-full px-4 py-2 text-left hover:bg-gray-600"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Side Panel Filter */}
        <aside className="w-full md:w-1/4 bg-gray-800 p-4">
          <h2 className="text-lg font-bold mb-4">Filter by Category</h2>
          {categories.map((category) => (
            <button
              key={category}
              className={`block w-full px-4 py-2 text-left rounded-lg mb-2 ${
                selectedCategory === category
                  ? "bg-green-600"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </aside>

        {/* Products Section */}
        <main className="w-full md:w-3/4 p-4">
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory} Products
          </h2>
          {filteredProducts.length === 0 ? (
            <p>No products available in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-green-400 font-bold">{product.price}</p>
                  <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                    <FaCartArrowDown className="mr-2" /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Categories;
