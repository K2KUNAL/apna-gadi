import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Features.css";

const Features = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const featuresData = [
    {
      id: 1,
      icon: "🚗",
      title: "Electric Scooters",
      description: "Rent eco-friendly electric scooters at affordable prices.",
    },
    {
      id: 2,
      icon: "🔋",
      title: "Battery Swap Stations",
      description: "Convenient battery swapping for uninterrupted rides.",
    },
    {
      id: 4,
      icon: "💰",
      title: "Affordable Pricing",
      description: "Low-cost rentals with flexible pricing plans.",
    },
    {
      id: 5,
      icon: "🛠️",
      title: "24/7 Support",
      description: "We are here for you anytime you need help with your ride.",
    },
    {
      id: 6,
      icon: "🎯",
      title: "Precise Locations",
      description: "Locate rental stations with pinpoint accuracy on the map.",
    },
    {
      id: 7,
      icon: "🛒",
      title: "Instant Booking",
      description: "Quick and easy vehicle booking at your fingertips.",
    },
    {
      id: 8,
      icon: "📱",
      title: "Mobile App",
      description: "Manage your rentals seamlessly through our app.",
    },
    {
      id: 9,
      icon: "🌱",
      title: "Eco-Friendly",
      description: "Promoting sustainable and green transportation.",
    },
  ];

  // Function to handle modal close
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`features-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Navigation Bar */}
      <nav className="features-nav">
        <h1>Apna Gadi - Features</h1>
        <div className="features-buttons">
          <button onClick={() => navigate("/home")}>Back to Home</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>

      {/* Features Grid */}
      <section className="features-grid">
        <br></br> <br></br>
        <div className="features-list">
          {featuresData.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section className="features-subscriptions">
        <h2>Choose a Membership Plan</h2>
        <p>Save more with our weekly and monthly plans!</p>
        <button onClick={() => setShowModal(true)}>View Plans</button>
      </section>

      {/* FAQ Section */}
      <section className="features-faq">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>How do I rent a vehicle?</summary>
          <p>Simply sign up, choose a vehicle, and book it online.</p>
        </details>
      </section>

      {/* Referral & Loyalty Program */}
      <section className="features-referral">
        <h2>Refer & Earn</h2>
        <p>Invite friends and get discounts on your next ride!</p>
        <button>Refer Now</button>
      </section>

      {/* Modal to show subscription plans */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Our Subscription Plans</h2>
            <p>Choose the best plan that suits your needs:</p>
            <ul>
              <li><strong>Weekly Plan</strong>: Rent for 7 days at a discounted rate.</li>
              <li><strong>Monthly Plan</strong>: Rent for a month with additional perks.</li>
              <li><strong>Annual Plan</strong>: Best value for frequent riders.</li>
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Features;
