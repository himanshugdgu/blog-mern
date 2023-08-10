const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Controller function for adding a comment to a post
exports.addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (!content) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    // Create the new comment
    const newComment = new Comment({
      content,
      post: postId,
      author: req.user.userId,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Add the comment to the post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    res.json({ message: "Comment added successfully.", comment: savedComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment.", error: error.message });
  }
};

// Controller function for getting all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post and populate its comments
    const post = await Post.findById(postId).populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json(post.comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments.", error: error.message });
  }
};

// Controller function for deleting a comment
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment in the database
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // Check if the current user is the author of the comment
    if (comment.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment." });
    }

    // Delete the comment from the database
    await comment.deleteOne();

    // Remove the comment from the post's comments array
    const postId = comment.post;
    const post = await Post.findById(postId);
    if (post) {
      post.comments = post.comments.filter((c) => c.toString() !== commentId);
      await post.save();
    }

    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment.", error: error.message });
  }
};
