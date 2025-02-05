
import React, { useState, useEffect } from "react";
import { FaCartArrowDown } from "react-icons/fa";

const VegetablesPage = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVegetables = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v2/product/get-Vegetables");
        if (!response.ok) {
          throw new Error("Failed to fetch vegetables");
        }
        const data = await response.json();
        setVegetables(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVegetables();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Banner Section */}
      <div
        className="bg-cover bg-center p-6 text-center rounded-md"
        style={{
          backgroundImage: "url('https://gabbarfarms.com/cdn/shop/products/Spinach_1000x.jpg?v=1620713074')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-md">
          <h2 className="text-2xl font-bold text-white">Fresh Vegetables are now just a click away.</h2>
          <button className="mt-4 px-4 py-2 bg-white text-green-500 font-semibold rounded-md hover:bg-gray-100">
            Order Now
          </button>
        </div>
      </div>

      {/* Vegetables List */}
      <section className="py-10 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center underline underline-offset-4 decoration-green-500">
            Vegetables
          </h2>

          {loading && <p className="text-white text-center">Loading products...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {vegetables.length > 0 ? (
              vegetables.map((vegetable) => {
                const measurement = vegetable.measurement || "1kg"; // Default to "1kg" if no measurement available

                return (
                  <div
                    key={vegetable._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md relative group overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {/* Animation Layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gray-900 bg-opacity-30 rounded-lg"></div>

                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={vegetable.image.startsWith("http") ? vegetable.image : `http://localhost:8000${vegetable.image}`}
                        alt={vegetable.name}
                        className="w-full h-40 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="mt-3">
                      <h3 className="text-md font-bold text-white truncate">{vegetable.name}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <p className="text-green-100 font-bold">
                          ₹{vegetable.discountPrice || vegetable.originalPrice}
                          <span className="line-through text-gray-400">
                            ₹{vegetable.originalPrice}
                          </span>
                        </p>
                        <span className="text-gray-300 font-medium">{measurement}</span>
                      </div>
                      <p className="text-yellow-400 text-xs mt-1">
                        Rating: {vegetable.ratings} / 5 ({vegetable.reviews?.length} reviews)
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
              <p className="text-white text-center">No vegetables available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VegetablesPage;
