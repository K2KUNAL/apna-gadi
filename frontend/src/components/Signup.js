import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // Ensure API is correctly set up

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    // Validation Checks
    if (!name || !email || !phone || !password || !confirmPassword) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    if (!/^[a-zA-Z ]{3,}$/.test(name)) {
      setMessage("⚠️ Name should have at least 3 characters and only letters!");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setMessage("⚠️ Enter a valid email address!");
      return;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
      setMessage("⚠️ Enter a valid 10-digit phone number!");
      return;
    }

    if (password.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("⚠️ Passwords do not match!");
      return;
    }

    try {
      console.log("📤 Sending Signup Request:", { name, email, phone, password });

      const response = await API.post("/signup", { name, email, phone, password });

      console.log("✅ Signup Response:", response.data);

      if (response.data.success) {
        setSuccess(true);
        setMessage("🎉 Signup successful! Redirecting...");
        localStorage.setItem("isLoggedIn", "true");

        setTimeout(() => navigate("/home"), 2000); // Redirect after 2 seconds
      } else {
        setMessage(response.data.error || "🚨 Signup failed! Try again.");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.error || "🚨 Signup failed! Please try again.");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      background: "#f8f9fa" 
    }}>
      <div style={{ 
        maxWidth: "400px", 
        width: "100%", 
        padding: "20px", 
        borderRadius: "10px", 
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", 
        background: "#fff",
        border: "3px solid black",
        transition: "transform 0.3s ease-in-out"
      }}>
        <center>
        <h2 style={{ 
          textAlign: "center", 
          fontSize: "1.8rem", 
          fontWeight: "bold", 
          color: "black",
          backgroundColor: "yellow",
          padding: "10px",
          borderRadius: "5px"
        }}>
          Signup 
        </h2>
        </center>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="name"
              style={{ 
                width: "100%", 
                padding: "10px", 
                fontSize: "1rem", 
                border: "2px solid black", 
                borderRadius: "5px", 
                transition: "0.3s" 
              }}
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              style={{ 
                width: "100%", 
                padding: "10px", 
                fontSize: "1rem", 
                border: "2px solid black", 
                borderRadius: "5px", 
                transition: "0.3s" 
              }}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="phone"
              style={{ 
                width: "100%", 
                padding: "10px", 
                fontSize: "1rem", 
                border: "2px solid black", 
                borderRadius: "5px", 
                transition: "0.3s" 
              }}
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="password"
              style={{ 
                width: "100%", 
                padding: "10px", 
                fontSize: "1rem", 
                border: "2px solid black", 
                borderRadius: "5px", 
                transition: "0.3s" 
              }}
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="confirmPassword"
              style={{ 
                width: "100%", 
                padding: "10px", 
                fontSize: "1rem", 
                border: "2px solid black", 
                borderRadius: "5px", 
                transition: "0.3s" 
              }}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={{ 
            width: "100%", 
            padding: "10px", 
            fontSize: "1.2rem", 
            fontWeight: "bold", 
            background: "black", 
            color: "yellow", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            transition: "0.3s" 
          }}>
            {success ? "✅ Signing Up..." : "Signup"}
          </button>
        </form>

        {message && <p style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold", color: success ? "green" : "red" }}>{message}</p>}

        <p style={{ textAlign: "center", marginTop: "15px", color: "black", fontWeight: "bold" }}>
  Already have an account? <Link to="/login" style={{ color: "darkblue", textDecoration: "none", fontWeight: "bold" }}>Login here</Link>
</p>

      </div>
    </div>
  );
};

export default Signup;
