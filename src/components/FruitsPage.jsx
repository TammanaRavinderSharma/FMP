
import React, { useState, useEffect } from "react";
import { FaSearch, FaCartArrowDown } from "react-icons/fa";

const FruitsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v2/product/get-fruits"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch fruits");
        }
        const data = await response.json();
        setFruits(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  const filteredFruits = fruits.filter(
    (fruit) =>
      fruit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-green-500 text-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FruitMart</h1>
          <div className="flex-1 flex justify-center">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search for fruits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-10 py-2 rounded-md outline-none text-black"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section id="products" className="py-10 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center underline underline-offset-4 decoration-green-500">
            Fruits
          </h2>

          {/* Loading and Error Handling */}
          {loading && <p className="text-white text-center">Loading products...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredFruits.length > 0 ? (
              filteredFruits.map((fruit) => {
                const measurement = fruit.quantity +"kg"|| "1kg"; // Default to "1kg" if no measurement available

                return (
                  <div
                    key={fruit.id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md relative group overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {/* Animation Layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gray-900 bg-opacity-30 rounded-lg"></div>

                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={fruit.image.startsWith("http") ? fruit.image : `http://localhost:8000${fruit.image}`}
                        alt={fruit.name}
                        className="w-full h-40 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="mt-3">
                      <h3 className="text-md font-bold text-white truncate">{fruit.name}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <p className="text-green-100 font-bold">
                          ₹{fruit.discountPrice || fruit.originalPrice}
                          <span className="line-through text-gray-400">
                            ₹{fruit.originalPrice}
                          </span>
                        </p>
                        {/* Measurement/Quantity */}
                        <span className="text-gray-300 font-medium">{measurement}</span>
                      </div>
                      <p className="text-yellow-400 text-xs mt-1">
                        Rating: {fruit.ratings} / 5 ({fruit.reviews.length} reviews)
                      </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="mt-4 w-full bg-green-600 text-white text-sm rounded-md py-1 hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2">
                      <FaCartArrowDown /> Add to Cart
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-center">No featured products available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FruitsPage;
