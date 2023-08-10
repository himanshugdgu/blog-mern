const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const router = express.Router();

router.route("/signup").post(registerUser);
router.post("/login", loginUser);
router.route("/logout").get(logout);

module.exports = router;
