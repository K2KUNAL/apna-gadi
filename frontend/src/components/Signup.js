import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signUpUser, signInWithGoogle, signInWithGitHub } from "../controllers/authController";
import "./Signup.css"; 

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // ✅ Unified navigation after successful signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
        setMessage("⚠️ All fields are required!");
        return;
    }

    if (password !== confirmPassword) {
        setMessage("⚠️ Passwords do not match!");
        return;
    }

    try {
        const result = await signUpUser(email, password);
        if (result.success) {
            setSuccess(true);
            setMessage("🎉 Signup successful! Redirecting...");
            
            // ✅ Store user info to persist session
            localStorage.setItem("user", JSON.stringify(result.user));

            // ✅ Redirect to Home Page IMMEDIATELY
            navigate("/home");
        } else {
            setMessage(result.message || "🚨 Signup failed! Try again.");
        }
    } catch (error) {
        setMessage(error.message || "🚨 Signup failed! Please try again.");
    }
};

// ✅ Google Signup with Redirection
const handleGoogleSignup = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user)); // ✅ Store session
        navigate("/home");  // ✅ Redirect immediately
    } else {
        setMessage(result.message || "🚨 Google signup failed! Try again.");
    }
};

// ✅ GitHub Signup with Redirection
const handleGitHubSignup = async () => {
    const result = await signInWithGitHub();
    if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user)); // ✅ Store session
        navigate("/home");  // ✅ Redirect immediately
    } else {
        setMessage(result.message || "🚨 GitHub signup failed! Try again.");
    }
};

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          
          <div className="password-field">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required />
            <span onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>

          <div className="password-field">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            <span onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>

          <button type="submit" className="signup-btn">{success ? "✅ Signing Up..." : "Signup"}</button>
        </form>
        {message && <p className="message">{message}</p>}

        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleSignup}><FcGoogle /> Sign up with Google</button>
          <button className="github-btn" onClick={handleGitHubSignup}><FaGithub /> Sign up with GitHub</button>
        </div>

        <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
