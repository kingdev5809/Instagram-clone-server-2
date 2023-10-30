const router = require("express").Router();
const {
  createPosts,
  getPosts,
  postLike,
  getUserPosts,
  editPost,
  deletePost,
} = require("../controllers/postController");
router.post("/add", createPosts);
router.get("/all", getPosts);
router.get("/user/:id", getUserPosts);
router.post("/edit", editPost);
router.post("/delete/:id", deletePost);
router.post("/like", postLike);
module.exports = router;
