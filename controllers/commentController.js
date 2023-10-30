const Comment = require("../models/commentModel");

module.exports.getComments = async (req, res, next) => {
  try {
    const posts = await Comment.find({ postId: { $in: req.params.id } }).select(
      ["text", "user", "postId"]
    );
    return res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports.addComments = async (req, res, next) => {
  try {
    const { text, postId, user } = req.body;
    const post = await Comment.create({
      text,
      user,
      postId,
    });
    return res.json(post);
  } catch (err) {
    next(err);
  }
};
