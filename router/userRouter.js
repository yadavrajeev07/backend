"use strict";
const express = require("express");
const router = express.Router();
const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
// Create a new user
// Signup route with auto-login
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new UserModel({ name, email, password });
    await user.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Generate JWT token valid for 2 hours
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "YOUR_SECRET_KEY", // Replace with your secret key
      { expiresIn: "2h" } // 2 hours
    );

    // Send response with token and user info
    res.status(201).json({
      message: "Signup successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Signup failed", error: error.message });
  }
});



// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }   
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and password
    const user = await UserModel.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from user object before sending response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Generate JWT token valid for 2 hours
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "YOUR_SECRET_KEY", // Replace with your secret key
      { expiresIn: "2h" } // Token expires in 2 hours
    );

    // Send response with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;  
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status((500), send(error));
    }
});


module.exports = router;
