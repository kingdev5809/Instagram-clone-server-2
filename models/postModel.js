const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    ref: "Users",
    required: true,
  },
  comments: {
    type: Array,
  },
  likes: {
    type: Array,
  },
});

module.exports = mongoose.model("Post", postSchema);
