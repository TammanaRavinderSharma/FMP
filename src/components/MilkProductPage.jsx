
import React, { useState, useEffect } from "react";

const MilkProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [milkProducts, setMilkProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000/api/v2/product/get-products-by-category?category=Milk-products";

  useEffect(() => {
    const fetchMilkProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch milk products");
        }
        const data = await response.json();
        setMilkProducts(data.products.filter(product => product.category === "Milk-products"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMilkProducts();
  }, []);

  const filteredMilkProducts = milkProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <nav className="bg-green-500 text-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">MilkMart</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for milk products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-md outline-none text-black"
            />
          </div>
        </div>
      </nav>

      <div className="flex flex-col p-4 container mx-auto flex-grow">
        <div className="w-full p-4">
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {filteredMilkProducts.length > 0 ? (
                filteredMilkProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-gray-900 text-white border rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {product.discount}
                      </span>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-xl transform hover:scale-110 transition duration-300 ease-in-out"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-100 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">{product.description || "No description available"}</p>
                      <p className="text-green-400 text-lg font-bold mb-2">₹{product.discountPrice || product.originalPrice}</p>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="text-sm text-gray-400">Stock: {product.stock > 0 ? `${product.stock} left` : "Out of Stock"}</div>
                        <div className="text-sm text-yellow-300">⭐ {product.ratings} / 5</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-5 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                        >
                          Add to Cart
                        </button>
                        <button className="px-5 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No milk products found.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilkProductsPage;
