const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  text: {
    type: Array,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
