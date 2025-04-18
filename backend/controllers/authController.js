import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// @route   POST /api/login
// @desc    Authenticate user & get token
// @access  Public
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    console.log("User found:", user ? user.username : "No user found");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    console.log("Attempting to compare password:", password);
    const isMatch = await user.comparePassword(password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.json({ message: "Login successful", token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/register (for development purposes)
// @desc    Register a user
// @access  Public
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      password,
    });

    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.json({ message: "Registration successful", token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
