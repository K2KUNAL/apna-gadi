import dotenv from "dotenv";
dotenv.config(); // Load .env variables FIRST

console.log("🚀 DEBUG: Loading Environment Variables...");
console.log("🚀 DEBUG: JWT_SECRET is:", process.env.JWT_SECRET); // Check if it's undefined

import express from "express";
import cors from "cors";
import { signup, login } from "./authController.js";
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Apna Gadi!");
});

// ✅ Auth Routes
app.post("/signup", signup);
app.post("/login", login);

// ✅ Protected Routes (Requires Authentication)
app.use("/api", protectedRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
