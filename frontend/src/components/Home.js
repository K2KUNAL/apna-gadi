import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AGlogo from "./images/AGlogo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav>
        <h1 className="logo">
          <img src={AGlogo} alt="Apna Gadi Logo" className="logo-img" />
          Apna Gadi
        </h1>
        <div className="nav-buttons">
          <button onClick={() => navigate("/Features")}>Features</button>
          <button onClick={() => navigate("/login")}>Login / Register</button>
          <button onClick={() => navigate("/dashboard")}>My Dashboard</button>
        </div>
      </nav>

      {/* Hero Section with Updated Layout */}
      <div className="hero-about-container">
        <div className="hero-section">
          <div className="welcome-text">
            <h1>Welcome to Apna Gadi</h1>
            <p>Rent electric scooters & cars hassle-free and eco-friendly!</p>
            <button
              className="book-now-btn"
              onClick={() => navigate("/booking")}
            >
              Book Now
            </button>
            <img
              src={require("./images/EV1.png")}
              alt="Electric Vehicle"
              className="hero-image"
            />
          </div>
        </div>

        {/* About Apna Gadi Section - Positioned Right */}
        <div className="about-apna-gadi">
          <h2>
            About <span className="highlight">Apna Gadi</span>
          </h2>
          <p>
            <strong>Apna Gadi</strong> revolutionizes urban travel by making
            electric scooters and cars{" "}
            <strong>affordable, convenient, and eco-friendly</strong>. Whether
            it's your <strong>daily commute</strong>, a{" "}
            <strong>weekend getaway</strong>, or a{" "}
            <strong>business trip</strong>, we ensure a seamless, hassle-free
            experience.
          </p>
          <p>
            Founded in <strong>Vijayapur</strong>, near{" "}
            <strong>Chetana BBA and BCA College</strong>, we empower
            <strong> students, professionals, and residents</strong> with{" "}
            <strong>sustainable transport solutions</strong>. Our mission? To
            make <strong>green mobility accessible to all</strong> while keeping
            travel <strong>budget-friendly and hassle-free</strong>.
          </p>
          <div className="learn-more-btn-container">
            <button className="learn-more-btn" onClick={() => navigate("/about")}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <section className="grid">
        <FeatureCard
          imgSrc="https://source.unsplash.com/400x300/?electric-scooter"
          title="E-Scooters"
          description="Eco-friendly & smooth rides."
        />
        <FeatureCard
          imgSrc="https://source.unsplash.com/400x300/?electric-car"
          title="E-Cars"
          description="Comfort & efficiency combined."
        />
        <FeatureCard
          imgSrc="https://source.unsplash.com/400x300/?charging-station"
          title="Charging Stations"
          description="Charge up at our locations."
        />
      </section>

      {/* Offers Section */}
      <section className="offers-section">
        <h2>Today's Rental Offers</h2>
        <div className="offers-grid">
          <OfferCard
            title="Ride More, Pay Less!"
            description="Flat 20% off on e-scooter rentals for students."
          />
          <OfferCard
            title="Weekend Special Deal"
            description="Book an e-car for 2+ days & get 15% off!"
          />
        </div>
      </section>

      {/* Why Choose Apna Gadi? */}
      <section className="custom-card-section">
        <h2 className="section-title1">
          Why Choose <span className="highlight1">Apna Gadi?</span>
        </h2>
        <p className="section-subtitle">
          Experience seamless, eco-friendly, and affordable transportation like
          never before!
        </p>

        <div className="custom-card-container">
          <CustomCard
            icon="/icons/safety.svg"
            title="Convenience & Safety"
            description="Secure, reliable, and hassle-free rides at your fingertips."
          />
          <CustomCard
            icon="/icons/affordable.svg"
            title="Affordable Prices"
            description="Enjoy budget-friendly rides with transparent pricing."
          />
          <CustomCard
            icon="/icons/eco-friendly.svg"
            title="Eco-Friendly Rides"
            description="Choose sustainability with our 100% electric vehicles."
          />
          <CustomCard
            icon="/icons/support.svg"
            title="24/7 Customer Support"
            description="We're here for you anytime, anywhere!"
          />
        </div>
      </section>

      {/* Mobile App Promo */}
      <section className="mobile-app">
        <h2>Download the Apna Gadi App</h2>
        <p>Book your rides instantly, anytime & anywhere!</p>
        <button>Download Now</button>
      </section>
    </div>
  );
};

// Reusable Component for Feature Cards
const FeatureCard = ({ imgSrc, title, description }) => (
  <div className="feature-card">
    <img src={imgSrc} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Reusable Component for Offers
const OfferCard = ({ title, description }) => (
  <div className="offer-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Reusable Component for Custom Cards
const CustomCard = ({ icon, title, description }) => (
  <div className="custom-card">
    <img src={icon} alt={title} className="card-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default Home;
