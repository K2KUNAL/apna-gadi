import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Load environment variables
import { signup, login } from "./authController.js"; // Ensure this file exists
import protectedRoutes from "./routes/protectedRoutes.js"; // ✅ Now this will work

dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json()); // ✅ This must be BEFORE routes

app.get("/", (req, res) => {
    res.send("Welcome to Apna Gadi!");
});

// ✅ Auth Routes
app.post("/signup", signup);
app.post("/login", login);

// ✅ Protected Routes (Requires Authentication)
app.use("/api", protectedRoutes); // All protected routes will be under /api

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
