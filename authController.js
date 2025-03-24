import { db } from "./db.js"; // Import database connection
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    console.error("🚨 ERROR: JWT_SECRET is not defined in .env file!");
    process.exit(1);
}

// ✅ Signup API
export const signup = async (req, res) => {
    console.log("📤 Received Signup Request:", req.body);

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: "⚠️ All fields are required!" });
    }

    try {
        // 🔍 Check if user already exists
        const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ error: "⚠️ You are already a user of Apna Gadi. Please login!" });
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 📝 Insert new user
        const [result] = await db.execute(
            "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)", 
            [name, email, hashedPassword, phone]
        );

        res.status(201).json({ success: true, message: "🎉 Signup successful! Redirecting...", userId: result.insertId });

    } catch (error) {
        console.error("❌ Database error:", error);
        res.status(500).json({ error: "🚨 Internal server error! Please try again." });
    }
};

// ✅ Login API
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // 🔍 Find user in DB
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = users[0];

        // 🔐 Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // 🔑 Generate JWT Token
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "2h" });

        res.status(200).json({ success: true, message: "✅ Login successful!", token, userId: user.id });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
