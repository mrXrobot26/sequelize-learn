const { user, post } = require("../models");
const { where } = require("sequelize");

const createPost = async (req, res) => {
  try {
    const newPost = await post.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findAllPostsForUser = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await post.findAll({
      where: { userId: id },
      include: [
        {
          model: user,
          as: "user",
        },
      ],
    });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  findAllPostsForUser,
};
