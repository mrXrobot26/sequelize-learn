const { user } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    const existedEmail = await user.findOne({
      where: { email: req.body.email },
    });
    if (existedEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newUser = await user.create(req.body);
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET);
    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const token = jwt.sign({ id: foundUser.id }, JWT_SECRET);
    return res.json({ user: foundUser, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
