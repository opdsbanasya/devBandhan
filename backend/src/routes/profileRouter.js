const express = require("express");
const { validateUpdateData } = require("../utils/validate");
const User = require("../models/user");

const { userAuth } = require("../middlewares/authMiddleware");

const profileRouter = express.Router();

// Get /profile API
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// PATCH /user API - to update an user
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const data = req.body;

    // validate the data
    validateUpdateData(data);

    const {user} = req;

    // finding the user and updating their data
    const user1 = await User.updateOne({_id: user._id}, data);
    console.log(user1);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// DELETE /user API
profileRouter.delete("/user", async (req, res) => {
  try {
    // finding the user and deleting the user
    const user = await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = profileRouter;
