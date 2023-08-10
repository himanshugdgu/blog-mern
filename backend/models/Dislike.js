// models/dislike.js

const mongoose = require("mongoose");

const dislikeSchema = new mongoose.Schema({
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

const Dislike = mongoose.model("Dislike", dislikeSchema);

module.exports = Dislike;
