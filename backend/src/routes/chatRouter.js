const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const Chat = require("../models/chat");
const mongoose = require("mongoose");

const chatRouter = express.Router();

chatRouter.get("/chat/:toUserId", userAuth, async (req, res) => {
  try {
    let { toUserId } = req.params;
    const userId = req.user._id;

    // find the existing chat
    let chat = await Chat.findOne({
      participants: { $all: [userId, toUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName profilePhoto",
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, toUserId],
        messages: [],
      });
    }

    res.json(chat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = chatRouter;
