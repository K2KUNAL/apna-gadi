import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import BookingPage from "./components/BookingPage";

import "./App.css"; 
import PrivateRoute from "./components/PrivateRoute"; // ✅ Import PrivateRoute

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* ✅ Protect these routes using PrivateRoute */}
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
      <Route path="/features" element={<PrivateRoute><Features /></PrivateRoute>} />
      <Route path="/booking" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
