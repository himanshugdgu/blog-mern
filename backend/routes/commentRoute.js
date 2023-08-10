const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentControllers");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

// Route for adding a comment to a post
router.post("/:postId", isLoggedIn, commentController.addComment);

// Route for getting all comments for a post
router.get("/:postId", commentController.getCommentsByPost);

// Route for deleting a comment
router.delete("/:commentId", isLoggedIn, commentController.deleteComment);

module.exports = router;
