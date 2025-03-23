import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// 🔒 Protected Route: Get User Profile
router.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "Profile access granted", user: req.user });
});

// 🔒 Protected Route: Bookings
router.get("/bookings", authenticateUser, (req, res) => {
    res.json({ message: "Your bookings", userId: req.user.id });
});

export default router; // ✅ Ensure this is default export
