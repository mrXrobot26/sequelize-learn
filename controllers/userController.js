const { user, post } = require("../models");

const createUser = async (req, res) => {
  try {
    const existedEmail = await user.findOne({ where: { email: req.body.email } });
    if (existedEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newUser = await user.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      include: [{ model: post, as: "posts" }],
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
