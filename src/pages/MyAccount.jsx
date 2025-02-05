import React, { useState, useEffect } from "react";

const TABS = ["profile", "orders", "products", "settings"];
const TAB_LABELS = {
  profile: "Profile",
  orders: "Orders",
  products: "Products",
  settings: "Settings",
};

const SectionWrapper = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-green-700 mb-4">{title}</h2>
    {children}
  </div>
);

const ProfileSection = ({ profile, onEdit }) => (
  <SectionWrapper title="Profile Information">
    {Object.entries(profile).map(([key, value]) => (
      <p key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
      </p>
    ))}
    <button
      onClick={onEdit}
      className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
    >
      Edit Profile
    </button>
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
        <div key={id} className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-bold text-green-700">{name}</h3>
          <p><strong>Price:</strong> {price}</p>
          <p><strong>Description:</strong> {description}</p>
          <p>
            <strong>Stock:</strong>{" "}
            <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
            disabled={stock <= 0}
          >
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No products available.</p>
    )}
  </SectionWrapper>
);

const SettingsSection = () => (
  <SectionWrapper title="Account Settings">
    <button className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300 mb-4">
      Update Profile
    </button>
    <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300">
      Delete Account
    </button>
  </SectionWrapper>
);

const EditProfileSection = ({ profile, onSave, onCancel }) => {
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SectionWrapper title="Edit Profile">
      {Object.entries(editedProfile).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label className="block font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
      ))}
      <div className="flex space-x-4">
        <button
          onClick={() => onSave(editedProfile)}
          className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </SectionWrapper>
  );
};

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "profile");
  const [data, setData] = useState({
    profile: {},
    orders: [],
    products: [],
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    setData((prevData) => ({
      ...prevData,
      profile: updatedProfile,
    }));
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return isEditingProfile ? (
          <EditProfileSection profile={data.profile} onSave={handleSaveProfile} onCancel={handleCancelEdit} />
        ) : (
          <ProfileSection profile={data.profile} onEdit={handleEditProfile} />
        );
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
    <section className="py-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <header className="bg-white p-4 rounded-lg shadow-md mb-6">
          <nav className="flex justify-center space-x-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-label={`Go to ${TAB_LABELS[tab]} tab`}
                aria-current={activeTab === tab ? "page" : undefined}
                className={`px-6 py-2 rounded-lg font-bold transition duration-300 ${
                  activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </nav>
        </header>
        <main>{renderContent()}</main>
      </div>
    </section>
  );
};

export default MyAccount;
