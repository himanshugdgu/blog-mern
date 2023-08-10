// routes/postRoutes.js

const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

// Protected route for creating a new post
router.post("/create", isLoggedIn, postController.createPost);

// Protected route for updating a post
router.put("/:postId", isLoggedIn, postController.updatePost);

// Protected route for deleting a post
router.delete("/:postId", isLoggedIn, postController.deletePost);

// Public route for fetching all posts (doesn't require authentication)
router.get("/", postController.getAllPosts);

// get post of logged in user
router.get("/myPosts", isLoggedIn, postController.getMyPosts);

// Public route for fetching a single post by ID (doesn't require authentication)
router.get("/:postId", postController.getPostById);

// get all posts of a user
router.get("/user/:userId", postController.getPostsByUserId);

module.exports = router;
