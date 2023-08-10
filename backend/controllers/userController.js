const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cookieToken = require("../utils/cookieToken.js");

// Controller function for user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    user.password = undefined;
    cookieToken(user, res);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function for user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    user.password = undefined;

    cookieToken(user, res);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function for user logout
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
