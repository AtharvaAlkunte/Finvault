const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");
const router = express.Router();

/* =======================
   REGISTER USER
======================= */
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // ✅ Password length check
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        // ✅ Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role:"user",
            kycStatus:"Not Submitted"
        });

        

        // ✅ CREATE TOKEN (🔥 THIS WAS MISSING / WRONG)
        const token = jwt.sign(
            { userId: user._id,role:user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        // ✅ Send response
        res.status(201).json({
            message: " Registeration successful",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});

/* =======================
   LOGIN USER
======================= */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id,role:user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
