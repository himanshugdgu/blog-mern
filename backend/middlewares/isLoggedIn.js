// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

// Middleware to check if the user is logged in
exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: "false", message: "No token, authorization denied" });
    }
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.user = { userId: decodedToken.id };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: "false", message: "Authentication failed." });
  }
};
