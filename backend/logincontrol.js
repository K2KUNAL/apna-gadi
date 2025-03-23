import { db } from "./db.js"; // Ensure correct import
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const signup = async (req, res) => {
    console.log("Received Signup Request:", req.body); // Log full request body

    const { name, email, password, phone } = req.body;

    // Log extracted values to check if they are coming properly
    console.log("Name:", name, "Email:", email, "Phone:", phone, "Password:", password);

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)", 
            [name, email, hashedPassword, phone]  // Ensure `name` is included
        );

        res.status(201).json({ message: "Signup successful", userId: result.insertId });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// ✅ Login API
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // 🔹 Fetch user by email
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = users[0];

        // 🔹 Compare input password with hashed password from DB
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", userId: user.id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
