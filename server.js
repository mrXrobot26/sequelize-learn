const express = require("express");
const postRouter = require("./routers/postRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mount urls
app.use("/", postRouter);
app.use("/", userRouter);
app.use("/", authRouter);
