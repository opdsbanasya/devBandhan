const express = require("express");
const User = require("../models/user");

const userRouter = express.Router();

// GET /feed API - finding all users
userRouter.get("/feed", async (req, res) => {
  try {
    // finding all users
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = userRouter;
