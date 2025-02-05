
import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import axios from "axios";

const GrainsPage = () => {
  const [grains, setGrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrains = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v2/product/get-products-by-category?category=Grains"
        );
        setGrains(response.data.products.filter(product => product.category === "Grains"));
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch grains.");
        setLoading(false);
      }
    };

    fetchGrains();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading grains...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Banner Section */}
      <div
        className="bg-cover bg-center p-6 text-center rounded-md"
        style={{
          backgroundImage: "url(https://hips.hearstapps.com/hmg-prod/images/gettyimages-611609590-6627de2d8c0bb.jpg)",
        }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Quality Grains for a Healthy Lifestyle</h2>
        <button className="mt-4 px-6 py-3 bg-white text-green-500 font-semibold rounded-lg hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>

      {/* Grains List */}
      <section className="py-10 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center underline underline-offset-4 decoration-green-500">
            Grains
          </h2>

          {loading && <p className="text-white text-center">Loading products...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {grains.length > 0 ? (
              grains.map((grain) => {
                const measurement = grain.measurement || "1kg"; // Default to "1kg" if no measurement available

                return (
                  <div
                    key={grain._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md relative group overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {/* Animation Layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gray-900 bg-opacity-30 rounded-lg"></div>

                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={grain.image.startsWith("http") ? grain.image : `http://localhost:8000${grain.image}`}
                        alt={grain.name}
                        className="w-full h-40 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="mt-3">
                      <h3 className="text-md font-bold text-white truncate">{grain.name}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <p className="text-green-100 font-bold">
                          ₹{grain.discountPrice || grain.originalPrice}
                          <span className="line-through text-gray-400">
                            ₹{grain.originalPrice}
                          </span>
                        </p>
                        <span className="text-gray-300 font-medium">{measurement}</span>
                      </div>
                      <p className="text-yellow-400 text-xs mt-1">
                        Rating: {grain.ratings} / 5 ({grain.reviews?.length} reviews)
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
              <p className="text-white text-center">No grains available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrainsPage;
