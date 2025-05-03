const express = require("express");
const { user, post } = require("./models");
const { where } = require("sequelize");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/user", async (req, res) => {
  try {
    const newUser = await user.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/post", async (req, res) => {
  try {
    const newPost = await post.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await user.findAll({
      include: [{ model: post, as: "posts" }],
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/posts/:id", async (req, res) => {
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
});
