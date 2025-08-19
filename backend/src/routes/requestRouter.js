const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const { getRequestHtml } = require("../utils/constants");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const fromUserId = req.user._id;

      // status validation
      const allowedStatus = ["ignored", "interested"];
      const isStatusValid = allowedStatus.includes(status);
      if (!isStatusValid) {
        throw new Error("Invalid request");
      }

      // Validating is toUserId is exist in DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("Invalid user id");
      }

      // validating both fromUserId and toUserId
      const isRequestExist = await ConnectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      if (isRequestExist) {
        throw new Error("Connection request already sent");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const request = await connectionRequest.save();
      
      let reqHtml = getRequestHtml(toUser.firstName, req.user.firstName)
      const email = {
        subject: `${req.user.firstName} sent you a request!`,
        html: reqHtml,
        adresses: [{ address: toUser?.email }],
      }
      const response = await sendEmail(emailData);

      res.json({
        message: "Connection request sent!",
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // Reading the data
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // validating status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status not allowed");
      }

      //? requestId should be valid && loggedinUser === toUser && status = interested
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("Request not found");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
);

module.exports = requestRouter;
