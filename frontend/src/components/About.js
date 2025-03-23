import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css'; // Import the external CSS file
import EV2 from './images/EV2.png';
import EV3 from './images/EV3.png';
import EV10 from './images/EV10.png';
import founderImage from './images/kunal.jpg';

const About = () => {
    const navigate = useNavigate();
    const images = [EV2, EV3, EV10];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="about-container">
            {/* Header Section */}
            <header className="about-header">
                <h1>About <span className="highlight">Apna Gadi</span></h1>
                <p>Drive smart, go green, and rent your ride with <strong>ease</strong>!</p>
            </header>

            {/* Slideshow and Founder Section (Now Side by Side) */}
            <div className="about-main-section">
                {/* Left: Slideshow */}
                <div className="slideshow-container">
                    <img src={images[currentIndex]} alt="Slideshow EV" className="slideshow-image" />
                </div>
                
                {/* Right: Founder Card */}
                <div className="founder-card">
                    <img src={founderImage} alt="Founder" className="founder-image" />
                    <h3>Kunal</h3>
                    <p>Founder & CEO of Apna Gadi</p>
                </div>
            </div>

            {/* Mission and Why Choose Us */}
            <div className="about-section">
                <section className="about-box">
                    <h2>Our Mission</h2>
                    <p>
                        At <strong>Apna Gadi</strong>, we are committed to offering <strong>affordable, eco-friendly, and efficient</strong>
                        electric vehicle rental services. Our goal is to promote sustainable urban mobility.
                    </p>
                </section>

                <section className="about-box">
                    <h2>Why Choose <span className="highlight">Apna Gadi?</span></h2>
                    <div className="features">
                        <div className="feature">
                            <h3>🔋 Easy Charging</h3>
                            <p>Multiple charging stations available across the city.</p>
                        </div>
                        <div className="feature">
                            <h3>🌍 Eco-Friendly</h3>
                            <p>100% electric rides for a sustainable future.</p>
                        </div>
                        <div className="feature">
                            <h3>💰 Budget-Friendly</h3>
                            <p>Transparent pricing with zero hidden charges.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* How It Works */}
            <section className="about-content">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">1️⃣ Choose Your Ride</div>
                    <div className="step">2️⃣ Book Instantly</div>
                    <div className="step">3️⃣ Enjoy Your Ride</div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="testimonials">
                <h2>What Our Customers Say</h2>
                <div className="testimonial">
                    <p>"Apna Gadi made my commute super affordable and eco-friendly. Highly recommended!"</p>
                    <span>- Rahul M.</span>
                </div>
                <div className="testimonial">
                    <p>"Love the seamless booking process and excellent service!"</p>
                    <span>- Sneha K.</span>
                </div>
            </section>

            {/* Call to Action */}
            <div className="cta-section">
                <h2>Start Your Ride Today!</h2>
                <button className="cta-btn" onClick={() => navigate('/booking')}>Book Now</button>
            </div>

            {/* Footer */}
            <button className="back-home-btn" onClick={() => navigate('/home')}>Go to Home</button>
        </div>
    );
};

export default About;
