import React, { useState, useEffect } from "react";

const TABS = ["profile", "orders", "products", "settings"];
const TAB_LABELS = {
  profile: "Profile",
  orders: "Orders",
  products: "Products",
  settings: "Settings",
};

const SectionWrapper = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-green-400 mb-4">{title}</h2>
    {children}
  </div>
);

const ProfileSection = ({ profile }) => (
  <SectionWrapper title="Profile Information">
    {Object.entries(profile).map(([key, value]) => (
      <p key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
      </p>
    ))}
  </SectionWrapper>
);

const OrderHistorySection = ({ orders }) => (
  <SectionWrapper title="Order History">
    {orders.length > 0 ? (
      <ul>
        {orders.map(({ id, date, total, status }) => (
          <li key={id} className="mb-2">
            <strong>Order #{id}</strong> - {date} - {total} - {status}
          </li>
        ))}
      </ul>
    ) : (
      <p>No orders placed yet.</p>
    )}
  </SectionWrapper>
);

const ProductsSection = ({ products }) => (
  <SectionWrapper title="Available Products">
    {products.length > 0 ? (
      products.map(({ id, name, price, description, stock }) => (
        <div key={id} className="bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold text-green-400">{name}</h3>
          <p><strong>Price:</strong> {price}</p>
          <p><strong>Description:</strong> {description}</p>
          <p>
            <strong>Stock:</strong>{" "}
            <span className={stock > 0 ? "text-green-400" : "text-red-400"}>
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-black font-bold rounded-lg hover:bg-green-700 transition duration-300"
            disabled={stock <= 0}
          >
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-400">No products available.</p>
    )}
  </SectionWrapper>
);

const SettingsSection = () => (
  <SectionWrapper title="Account Settings">
    <button className="px-6 py-2 bg-green-600 text-black font-bold rounded-lg hover:bg-green-700 transition duration-300 mb-4">
      Update Profile
    </button>
    <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300">
      Delete Account
    </button>
  </SectionWrapper>
);

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "profile");
  const [data, setData] = useState({
    profile: {},
    orders: [],
    products: [],
  });

  useEffect(() => {
    setData({
      profile: { name: "Jane Doe", email: "janedoe@example.com", phone: "+1 (987) 654-3210", address: "456 Another St, City, Country" },
      orders: [
        { id: 1, date: "2025-01-05", total: "$75.00", status: "Shipped" },
        { id: 2, date: "2025-01-12", total: "$150.00", status: "Processing" },
      ],
      products: [
        { id: 1, name: "Organic Apples", price: "$10", description: "Fresh and juicy apples.", stock: 20 },
        { id: 2, name: "Wheat Flour", price: "$5", description: "High-quality wheat flour.", stock: 0 },
      ],
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection profile={data.profile} />;
      case "orders":
        return <OrderHistorySection orders={data.orders} />;
      case "products":
        return <ProductsSection products={data.products} />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white">
      <header className="bg-gray-900 p-4 shadow-md">
        <nav className="flex justify-center space-x-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-label={`Go to ${TAB_LABELS[tab]} tab`}
              aria-current={activeTab === tab ? "page" : undefined}
              className={`px-6 py-2 rounded-lg font-bold transition duration-300 ${
                activeTab === tab ? "bg-green-600 text-black" : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </nav>
      </header>
      <main className="p-8">{renderContent()}</main>
    </div>
  );
};

export default MyAccount;
