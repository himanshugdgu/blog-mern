// authRoutes.js

const express = require("express");

const User = require("../models/User");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

// Endpoint to check user's authentication status
router.get("/check-auth", isLoggedIn, async (req, res) => {
  try {
    // Get the user ID from the authentication middleware
    const userId = req.user.userId;

    // Find the user in the database by ID
    const user = await User.findById(userId).select("-password");

    // If the user is found, send the user data as the response
    res.json(user);
  } catch (err) {
    // If an error occurs, send an error response
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
