import React, { useState, useEffect } from "react";

const Wishlist = () => {
  // Sample product list with images
  const products = [
    { id: 1, name: "Organic Apples", price: 120, image: "https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Fresh Tomatoes", price: 80, image: "https://images.pexels.com/photos/8580230/pexels-photo-8580230.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
    { id: 3, name: "Carrots", price: 50, image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Mangoes", price: 150, image: "https://images.pexels.com/photos/16249483/pexels-photo-16249483/free-photo-of-close-up-of-yellow-mangoes.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, name: "Bananas", price: 60, image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, name: "Spinach", price: 40, image: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 7, name: "Pineapples", price: 100, image: "https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 8, name: "Avocados", price: 200, image: "https://images.pexels.com/photos/997389/pexels-photo-997389.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 9, name: "Strawberries", price: 180, image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=600" },
  ];

  // State to manage the wishlist
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [priceRange, setPriceRange] = useState([0, 200]); // Price range filter
  const [notification, setNotification] = useState(""); // Notification state

  // Load wishlist from localStorage (optional)
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Save wishlist to localStorage (optional)
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to wishlist
  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, { ...product, quantity: 1 }]);
      setNotification(`Added ${product.name} to wishlist!`);
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
    setNotification("Item removed from wishlist.");
    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  // Update quantity of an item in wishlist
  const updateQuantity = (productId, newQuantity) => {
    setWishlist(
      wishlist.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Filter products based on price range and search query
  const filteredProducts = products
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Share wishlist functionality (example using URL sharing)
  const shareWishlist = () => {
    const wishlistData = encodeURIComponent(JSON.stringify(wishlist));
    const url = `https://example.com/share-wishlist?data=${wishlistData}`;
    alert(`Share this URL: ${url}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer Marketplace</h1>

      {/* Search bar */}
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Price range filter */}
      <div className="mb-4">
        <label className="mr-2">Price Range:</label>
        <input
          type="number"
          className="border p-2"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          placeholder="Min Price"
        />
        <span className="mx-2">to</span>
        <input
          type="number"
          className="border p-2"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          placeholder="Max Price"
        />
      </div>

      {/* Product listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-4" />
            <h2 className="font-bold text-lg">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            {wishlist.some((item) => item.id === product.id) ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(product.id, Math.max(1, product.quantity - 1))
                  }
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  -
                </button>
                <span>{wishlist.find((item) => item.id === product.id)?.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(product.id, (wishlist.find((item) => item.id === product.id)?.quantity || 0) + 1)
                  }
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove from Wishlist
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToWishlist(product)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Add to Wishlist
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Wishlist Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Wishlist</h2>
        {notification && <p className="text-green-500 mb-2">{notification}</p>}
        {wishlist.length > 0 ? (
          <ul className="list-disc pl-6">
            {wishlist.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  {item.name} - ₹{item.price} x {item.quantity}
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="ml-4 text-yellow-500 underline"
                  >
                    Remove One
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="ml-4 text-red-500 underline"
                  >
                    Remove All
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your wishlist is empty.</p>
        )}
      </div>

      {/* Share Wishlist Button */}
      {wishlist.length > 0 && (
        <button
          onClick={shareWishlist}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Share Wishlist
        </button>
      )}
    </div>
  );
};

export default Wishlist;
