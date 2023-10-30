const Post = require("../models/postModel");

module.exports.createPosts = async (req, res, next) => {
  try {
    const { image, content, user } = req.body;

    if (!image) {
      return;
    }
    const post = await Post.create({
      image,
      user,
      content,
    });
    return res.json(post);
  } catch (err) {
    next(err);
  }
};

module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ _id: { $ne: req.params.id } }).select([
      "image",
      "likes",
      "userId",
      "content",
      "user",
    ]);
    return res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports.postLike = async (req, res, next) => {
  try {
    const { id, likedUsers } = req.body;

    await Post.findOneAndUpdate({ _id: id }, { $set: { likes: likedUsers } });
  } catch (error) {}
};

module.exports.getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ user: id });
    return res.json(posts);
  } catch (error) {}
};
module.exports.editPost = async (req, res, next) => {
  try {
    const { id, content } = req.body;
    await Post.findOneAndUpdate({ _id: id }, { $set: { content: content } });
  } catch (error) {}
};
module.exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
  } catch (error) {}
};
