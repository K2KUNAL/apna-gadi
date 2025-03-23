import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // Ensure API is correctly configured

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      console.log("📤 Sending Login Request:", formData);
      const response = await API.post("/login", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token for authentication
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/home"), 1500); // Redirect after success
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.error || "🚨 Invalid email or password!");
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
    },
    card: {
      background: "#ffffff",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
    },
    input: {
      marginBottom: "15px",
      padding: "10px",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
    message: {
      textAlign: "center",
      marginTop: "10px",
      color: "red",
    },
    link: {
      marginTop: "15px",
      display: "block",
      textDecoration: "none",
      color: "#007bff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
      <h2 style={{ 
          textAlign: "center", 
          fontSize: "1.8rem", 
          fontWeight: "bold", 
          color: "black",
          backgroundColor: "yellow",
          padding: "10px",
          borderRadius: "5px"
        }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              name="email"
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button 
  type="submit" 
  style={{
    width: "100%", 
    padding: "10px", 
    fontSize: "1.2rem", 
    fontWeight: "bold", 
    background: "black", 
    color: "yellow", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer", 
    transition: "0.3s",
  }}
>
  Login
</button>

        </form>

        {message && <p style={styles.message}>{message}</p>}

        {/* Signup Link */}
        <Link to="/signup" style={{ color: "blue", textDecoration: "none" }}>
  <span style={{ fontWeight: "bold", color: "black" }}>Don't have an account?</span> <span style={{ color: "darkblue", textDecoration: "none", fontWeight: "bold" }}>Sign up here</span>
</Link>
      </div>
    </div>
  );
};

export default Login;
