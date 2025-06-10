const express = require("express");
const {userAuth} = require("../middlewares/authMiddleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const fromUserId = req.user._id;

      // status validation
      const allowedStatus = ["ignored", "interested"]
      const isStatusValid = allowedStatus.includes(status);
      if(!isStatusValid){
        throw new Error("Invalid request");
      }
      
      // Validating is toUserId is exist in DB
      const toUser = await User.findById(toUserId)
      if(!toUser){
        throw new Error("Invalid user id");
      }

      // validating both fromUserId and toUserId
      const isRequestExist = await ConnectionRequest.findOne({
        $or: [
            {toUserId, fromUserId},
            {toUserId: fromUserId, fromUserId: toUserId}
        ]
      })
     if(isRequestExist){
        throw new Error(" Connection request already sent");
     }


      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const request = await connectionRequest.save();

      res.json({
        message: "Connection request sent!",
        request
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
