import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="bg-green-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to Farmer Marketplace</h1>
        <p className="text-lg mt-4">
          Empowering farmers with tools, products, and connections they need to thrive.
        </p>
      </header>

      {/* Mission, Vision, and Values Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
          Our Mission, Vision, and Values
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Mission",
              content: "To connect farmers with modern solutions and quality tools.",
              icon: "🌾",
            },
            {
              title: "Vision",
              content: "To build a future where agriculture thrives with innovation.",
              icon: "🌍",
            },
            {
              title: "Values",
              content: "Integrity, innovation, and a commitment to community.",
              icon: "💡",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-green-700">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Meet Our Team</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "John Doe", role: "Founder", image: "https://via.placeholder.com/150" },
            { name: "Jane Smith", role: "CTO", image: "https://via.placeholder.com/150" },
            { name: "Emily Davis", role: "Operations Manager", image: "https://via.placeholder.com/150" },
          ].map((teamMember, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
              <img
                src={teamMember.image}
                alt={teamMember.name}
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-green-700">{teamMember.name}</h3>
              <p className="text-gray-600">{teamMember.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Stay Updated</h2>
        <p className="text-center text-gray-700 mb-6">
          Sign up for our newsletter to receive updates about our latest products and services.
        </p>
        <form className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center">
        <p>&copy; 2025 Farmer Marketplace. All Rights Reserved.</p>
        <div className="mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-4 hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-4 hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-4 hover:underline"
          >
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
