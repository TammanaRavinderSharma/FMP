import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import debounce from "lodash.debounce"; // Importing debounce from lodash

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const bannerImages = [
    "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241210112748Hurda%20Combo%20Story%20Web.jpg?tr=f-webp",
    "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241219162537Story%20Banner%20Web%20%201920px%20%20600px.png?tr=f-webp",
    "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20240806183118Shrikhand%20web%20story.jpg?tr=f-webp",
  ];

  const categoryImages = [
    { name: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw1G8RTrp5ZdlTaWCPHhkJzPxzzzJJnIHt-Q&s", path: "/fruits" },
    { name: "Vegetables", image: "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6", path: "/vegetables" },
    { name: "Grains", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK18BMfed2b5kIHGTV_KPWsD3mGd2C05iBFQ&s", path: "/grains" },
    { name: "Milk Products", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjM0EiOlRNTCIomVZign46FOZw0zvshUx79A&s", path: "/milk-products" },
  ];

  const featuredProducts = [
    { name: "Fresh Mango", image: "https://www.gannett-cdn.com/-mm-/7cc8708fb3d2ff285b4c9ff38ae34d16c095d2ae/c=0-44-849-522/local/-/media/2015/08/18/PalmSprings/B9318468562Z.1_20150818140510_000_G8JBKOFRD.1-0.jpg?width=3200&height=1680&fit=crop", price: "₹250", description: "Juicy and ripe mangoes, freshly picked.", rating: 4 },
    { name: "Organic Carrots", image: "https://allirelandfoods.ie/wp-content/uploads/2021/01/shutterstock_772282168-1536x1034.jpg", price: "₹80", description: "Sweet and crunchy organic carrots.", rating: 5 },
    { name: "Fresh Milk", image: "https://static.toiimg.com/photo/msid-68670383/68670383.jpg?792974", price: "₹50", description: "Fresh milk straight from the farm.", rating: 3 },
    { name: "Green Apples", image: "https://tse3.mm.bing.net/th?id=OIP.qBEF9dcosQnjS6_B7H0fuQHaE8&pid=Api&P=0&h=180", price: "₹150", description: "Crisp and juicy green apples.", rating: 4 },
    { name: "Organic Tomatoes", image: "https://tse3.mm.bing.net/th?id=OIP.7sXD1I8TuX9VresgBYIzGgHaE7&pid=Api&P=0&h=180", price: "₹60", description: "Fresh and organic tomatoes, farm-grown.", rating: 5 },
    { name: "Bananas", image: "https://www.refinery29.com/images/10329784.jpg?crop=40:21", price: "₹40", description: "Fresh and sweet bananas.", rating: 3 },
    { name: "Spinach", image: "https://veggieharvest.com/wp-content/uploads/2020/11/spinach.jpg", price: "₹50", description: "Fresh spinach leaves for your meals.", rating: 5 },
    { name: "Cucumbers", image: "https://c8.alamy.com/comp/2J0C46N/cucumber-cucumbers-vegetables-fresh-exempt-isolated-2J0C46N.jpg", price: "₹30", description: "Crisp and refreshing cucumbers.", rating: 4 },
    { name: "Tomato Ketchup", image: "https://cdn.cdnparenting.com/articles/2019/01/15173455/574582132-H.jpg", price: "₹80", description: "Delicious tomato ketchup for every meal.", rating: 4 },
    { name: "Fresh Potatoes", image: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/4/3/0/shutterstock_Pi-Lens_166805753_take-your-potatoes-from-the-garden.jpg.rend.hgtvcom.1280.853.suffix/1522782108752.jpeg", price: "₹60", description: "Fresh potatoes straight from the farm.", rating: 5 },
    { name: "Honey", image: "https://5.imimg.com/data5/VA/MI/KI/SELLER-26190164/pure-honey-500x500.jpg", price: "₹150", description: "Pure and natural honey.", rating: 5 },
    { name: "Fresh Lettuce", image: "https://thumbs.dreamstime.com/z/fresh-lettuce-close-up-13777504.jpg", price: "₹40", description: "Fresh and crisp lettuce.", rating: 4 },
    { name: "Organic Rice", image: "https://tse3.mm.bing.net/th?id=OIP.Qx6LdAgm1nQKm9RXi82HUgHaE8&pid=Api&P=0&h=180", price: "₹90", description: "Organic rice for a healthy meal.", rating: 5 },
    { name: "Organic Avocados", image: "https://tse2.mm.bing.net/th?id=OIP.YCP_Shmp-6DG270_BQXl3QHaEG&pid=Api&P=0&h=180", price: "₹200", description: "Creamy and rich organic avocados.", rating: 5 },
    { name: "Fresh Pineapple", image: "https://tse4.mm.bing.net/th?id=OIP.13I8wPK5JZbBkGLKC-yYqwHaFs&pid=Api&P=0&h=180", price: "₹120", description: "Sweet and tangy fresh pineapples.", rating: 4 }
  ];
  
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleSearchChange = debounce((e) => setSearchTerm(e.target.value), 500); // Added debounce
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredProducts = featuredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortOption === "price") {
      return parseFloat(a.price.replace("₹", "")) - parseFloat(b.price.replace("₹", ""));
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500">
      {/* Banner Section */}
      <section className="py-4">
        <Slider {...sliderSettings}>
          {bannerImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`banner-${index}`} className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
            </div>
          ))}
        </Slider>
      </section>

      {/* Categories Section */}
      <section className="text-center py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Our Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoryImages.map((category, index) => (
            <NavLink to={category.path} key={index}>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between mb-6">
            <div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 border rounded-lg w-full md:w-64"
              />
            </div>
            <div>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="p-2 border rounded-lg"
              >
                <option value="default">Sort by</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-yellow-500">{'⭐'.repeat(product.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-10 bg-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-lg text-gray-600">
            Kisankonnect is a platform that connects farmers with consumers to make healthy and fresh food
            accessible to everyone.
          </p>
        </div>
      </section>

      
    
      
     {/* Farmer Marketplace Features Section */}
<section className="py-10 bg-white">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Farmer Marketplace?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Smart Feature */}
      <div className="bg-green-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-green-700 mb-4">Smart</h3>
        <p className="text-lg text-gray-600">
          Farmer Marketplace is available in five languages: English, Hindi, Gujarati, Marathi, and Telugu with the latest updated features.
        </p>
      </div>
      
      {/* Easy Feature */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Easy</h3>
        <p className="text-lg text-gray-600">
          Farmer Marketplace is a very easy and friendly mobile application for agricultural products to buy and sell.
        </p>
      </div>
      
      {/* Trusted Feature */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-yellow-700 mb-4">Trusted</h3>
        <p className="text-lg text-gray-600">
          Farmer Marketplace is a trusted application for agricultural products. All our users are verified.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Download App Section */}
      <section className="py-10 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Download Our App</h2>
        <p className="mb-6">Get fresh products delivered to your doorstep with just a click.</p>
        <div className="flex justify-center space-x-6">
          <button className="bg-blue-600 py-2 px-6 rounded-lg">Google Play</button>
          <button className="bg-gray-800 py-2 px-6 rounded-lg">App Store</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Customer Testimonials</h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-around space-x-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-lg text-gray-600">"Great service, fresh products, and fast delivery!"</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-2">John Doe</h3>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-lg text-gray-600">"I love the variety of fresh produce available!"</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-2">Jane Smith</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
