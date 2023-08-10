// models/likes.js

const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const Like = mongoose.model("Like", likesSchema);

module.exports = Like;
