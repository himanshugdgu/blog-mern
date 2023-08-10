// authRoutes.js

const express = require("express");

const User = require("../models/User");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

// Endpoint to check user's authentication status
router.get("/getDetails", isLoggedIn, async (req, res) => {
  try {
    // Get the user ID from the authentication middleware
    const userId = req.user.userId;

    // Find the user in the database by ID
    const user = await User.findById(userId).select("-password");

    // If the user is found, send the user data as the response
    return res.json(user);
  } catch (err) {
    // If an error occurs, send an error response
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
