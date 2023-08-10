// controllers/postController.js

const Post = require("../models/Post");
const User = require("../models/User");

// Controller function for creating a new post
exports.createPost = async (req, res) => {
  try {
    // Extract post data from the request body
    const { title, content } = req.body;

    // Get the user ID from the request object (set by the isLoggedIn middleware)
    const userId = req.user.userId;

    // Create a new post instance
    const newPost = new Post({
      title,
      content,
      author: userId, // Set the author as the user ID
    });

    // Save the post to the database
    await newPost.save();

    // Add the post to the user's posts array

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { posts: newPost._id },
      },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Post created successfully.", user: updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post.", error: error.message });
  }
};

// Controller function for updating a post
exports.updatePost = async (req, res) => {
  try {
    // Extract updated post data from the request body
    const { title, content } = req.body;

    // Get the post ID from the request params
    const postId = req.params.postId;

    // Find the post in the database by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post." });
    }

    // Update the post's title and content
    post.title = title;
    post.content = content;

    // Save the updated post to the database
    await post.save();

    res.json({ message: "Post updated successfully.", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post.", error: error.message });
  }
};

// Controller function for deleting a post
exports.deletePost = async (req, res) => {
  try {
    // Get the post ID from the request params
    const postId = req.params.postId;

    // Find the post in the database by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the current user is the author of the post
    if (post.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post." });
    }

    // Delete the post from the database
    await post.deleteOne();

    // Delete the post from the user's posts array
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { posts: postId },
    });

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post.", error: error.message });
  }
};

// Controller function for fetching all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find().populate("author", "username");

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts 1", error: error.message });
  }
};

// Controller function for fetching a single post by ID
exports.getPostById = async (req, res) => {
  try {
    // Get the post ID from the request params
    const postId = req.params.postId;

    // Find the post in the database by ID and populate the author field with username
    const post = await Post.findById(postId).populate("author", "username");
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post. 2", error: error.message });
  }
};

// Add more post-related controller functions here if needed
exports.getPostsByUserId = async (req, res) => {
  try {
    // Get the user ID from the request params

    const userId = req.params.userId;

    // Find all posts in the database by user ID
    const posts = await Post.find({ author: userId }).populate(
      "author",
      "username"
    );

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts. 3", error: error.message });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    // Get the user ID from the request params

    const userId = req.user.userId;
    // Find all posts in the database by user ID
    const posts = await Post.find({ author: userId }).populate(
      "author",
      "username"
    );

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts...", error: error.message });
  }
};
