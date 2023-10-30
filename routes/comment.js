const {
  getComments,
  addComments,
} = require("../controllers/commentController");

const router = require("express").Router();

router.get("/:id", getComments);
router.post("/", addComments);
module.exports = router;
