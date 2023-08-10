const Post = require("../models/Post");

// Controller function for adding a like to a post
exports.addLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res.status(409).json({ message: "You already liked this post." });
    }

    // Check if the user has previously disliked the post
    if (post.dislikes.includes(userId)) {
      // If the user has previously disliked, remove the dislike
      await Post.findByIdAndUpdate(postId, { $pull: { dislikes: userId } });
    }

    // Add the user's ID to the likes array of the post
    await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });

    res.json({ message: "Post liked successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding like.", error: error.message });
  }
};

// Controller function for adding a dislike to a post
exports.addDislike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user has already disliked the post
    if (post.dislikes.includes(userId)) {
      return res
        .status(409)
        .json({ message: "You already disliked this post." });
    }

    // Check if the user has previously liked the post
    if (post.likes.includes(userId)) {
      // If the user has previously liked, remove the like
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
    }

    // Add the user's ID to the dislikes array of the post
    await Post.findByIdAndUpdate(postId, { $push: { dislikes: userId } });

    res.json({ message: "Post disliked successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding dislike.", error: error.message });
  }
};

// Controller function for removing a like from a post
exports.removeLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      return res.status(409).json({ message: "You haven't liked this post." });
    }

    // Remove the user's ID from the likes array of the post
    await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });

    res.json({ message: "Post like removed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing like.", error: error.message });
  }
};

// Controller function for removing a dislike from a post
exports.removeDislike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user has disliked the post
    if (!post.dislikes.includes(userId)) {
      return res
        .status(409)
        .json({ message: "You haven't disliked this post." });
    }

    // Remove the user's ID from the dislikes array of the post
    await Post.findByIdAndUpdate(postId, { $pull: { dislikes: userId } });

    res.json({ message: "Post dislike removed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing dislike.", error: error.message });
  }
};
