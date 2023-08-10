const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

// Middleware to check if the user is logged in
router.use(isLoggedIn);

// Route to like a post
router.post("/like/:postId", likeController.addLike);

// Route to remove a like from a post
router.delete("/like/:postId", likeController.removeLike);

// Route to dislike a post
router.post("/dislike/:postId", likeController.addDislike);

// Route to remove a dislike from a post
router.delete("/dislike/:postId", likeController.removeDislike);

module.exports = router;
