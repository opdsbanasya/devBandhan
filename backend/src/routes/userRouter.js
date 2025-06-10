const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequest = require("../models/connectionRequest");

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

// GET all requests
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const pendingReqeusts = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName about gender age skills profilePhoto");

    res.json({
      message: "All connection request fetched successfully",
      pendingReqeusts,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
