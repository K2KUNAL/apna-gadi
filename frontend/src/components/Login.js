import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle, signInWithGitHub } from "../controllers/authController"; 
import { app } from "../firebase/firebaseConfig"; 
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const auth = getAuth(app);

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
      console.log("📤 Attempting Firebase Login:", formData);
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("✅ Firebase Login Success:", userCredential.user);
      
      localStorage.setItem("token", userCredential.user.accessToken); 
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.error("❌ Firebase Login Error:", error.message);
      setMessage("🚨 Invalid email or password!");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      console.log("✅ Google Login Success:", result.user);
      localStorage.setItem("token", result.user.accessToken);
      setTimeout(() => navigate("/home"), 1500);
    } else {
      setMessage(result.message);
    }
  };

  const handleGitHubLogin = async () => {
    const result = await signInWithGitHub();
    if (result.success) {
      console.log("✅ GitHub Login Success:", result.user);
      localStorage.setItem("token", result.user.accessToken);
      setTimeout(() => navigate("/home"), 1500);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", maxWidth: "400px", width: "100%", textAlign: "center" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: "bold", color: "black", backgroundColor: "yellow", padding: "10px", borderRadius: "5px" }}>Login</h2>
        
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ marginBottom: "15px", padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc" }} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ marginBottom: "15px", padding: "10px", width: "100%", borderRadius: "5px", border: "1px solid #ccc" }} />
          <button type="submit" style={{ width: "100%", padding: "10px", fontSize: "1.2rem", fontWeight: "bold", background: "black", color: "yellow", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }}>Login</button>
        </form>

        {message && <p style={{ textAlign: "center", marginTop: "10px", color: "red" }}>{message}</p>}

              <button className="google-btn" onClick={handleGoogleLogin}><FcGoogle /> Sign up with Google</button>
                  <button className="github-btn" onClick={handleGitHubLogin}><FaGithub /> Sign up with GitHub</button>
        <Link to="/signup" style={{ marginTop: "15px", display: "block", textDecoration: "none", color: "#007bff" }}>
          <span style={{ fontWeight: "bold", color: "black" }}>Don't have an account?</span> <span style={{ color: "darkblue", textDecoration: "none", fontWeight: "bold" }}>Sign up here</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
