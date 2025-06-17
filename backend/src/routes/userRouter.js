const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

// GET all requests
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const pendingRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName about gender age skills profilePhoto"
    );

    res.json({
      message: "All connection request fetched successfully",
      pendingRequests,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate(
        "fromUserId",
        "firstName lastName about gender age skills profilePhoto"
      )
      .populate(
        "toUserId",
        "firstName lastName about gender age skills profilePhoto"
      );

    const data = connections.map((request) => {
      if (request.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return request.toUserId;
      } else {
        return request.fromUserId;
      }
    });

    res.json({
      message: "All connection request fetched successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /feed API - finding all users
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // data reading
    const loggedInUser = req.user;
    const page = req.query.page || 1;
    const results = (req.query.results > 3 && 3) || 10;
    const skipResults = (page - 1) * results;

    // Finding user those are hidden from users feed
    const connections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // Pushing all hidden user from feed in a set
    const hiddenUserFromFeed = new Set();
    connections.map((user) => {
      hiddenUserFromFeed.add(user.fromUserId.toString());
      hiddenUserFromFeed.add(user.toUserId.toString());
    });

    // Finding all users except the hidden users and loggedInUser
    const usersForFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName about gender age skills profilePhoto")
      .skip(skipResults)
      .limit(results);

    res.json({ message: "User feed Data", usersForFeed });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
