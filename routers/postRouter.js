const express = require("express");
const {
  createPost,
  findAllPostsForUser,
} = require("../controllers/postController");
const router = express.Router();

router.post("/post", createPost);
router.get("/posts/:id", findAllPostsForUser);

module.exports = router;
