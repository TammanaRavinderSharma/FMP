import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to access the route parameters

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL parameter
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/v2/product/get-product/${id}`);
        console.log("Product Detail:", response.data); // Check response structure
        if (response.data && response.data.product) {
          setProduct(response.data.product);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error); // Log error for debugging
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // Re-fetch product details when the product ID changes

  return (
    <div className="min-h-screen bg-black py-6">
      {loading && <p className="text-white text-center">Loading product details...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {product && (
        <div className="container mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="text-white">
              <h2 className="text-3xl font-extrabold">{product.name}</h2>
              <p className="text-lg text-gray-400 mt-2">{product.description}</p>
              <div className="mt-4">
                <p className="text-xl font-bold text-green-500">
                  ₹{product.discountPrice}{" "}
                  <span className="line-through text-gray-400">
                    ₹{product.originalPrice}
                  </span>
                </p>
                <p className="text-sm text-gray-300 mt-1">Measurement: {product.measurement || "1kg"}</p>
                <p className="text-yellow-400 text-xs mt-2">
                  Rating: {product.ratings} / 5 ({product.reviews.length} reviews)
                </p>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white text-sm rounded-md py-2 hover:bg-green-700 transition-all duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
