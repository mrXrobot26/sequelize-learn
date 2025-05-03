const express = require("express");
const { createUser, getAllUsers } = require("../controllers/userController");
const { auth, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/user", auth, isAdmin, createUser); // Only admins can create users
router.get("/users", auth, getAllUsers); // Any authenticated user can view users

module.exports = router;
