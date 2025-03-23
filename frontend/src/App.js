import { Routes, Route } from "react-router-dom";  // ✅ Only import Routes & Route
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import BookingPage from "./components/BookingPage";
import "./App.css"; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
};

export default App;
