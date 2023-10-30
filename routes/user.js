const {
  getOneUser,
  updateOneUser,
  getAllUsers,
  followUser,
  register,
  login,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/all", getAllUsers);
router.get("/:id", getOneUser);
router.post("/edit", updateOneUser);
router.post("/follow", followUser);
router.post("/register", register);
router.post("/login", login);
module.exports = router;
