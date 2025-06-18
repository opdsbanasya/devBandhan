const express = require("express");
const { validateUpdateData } = require("../utils/validate");
const User = require("../models/user");
const validator = require("validator");

const { userAuth } = require("../middlewares/authMiddleware");

const profileRouter = express.Router();

// Get /profile API
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const userData = req.user;
    const { firstName, lastName, about, gender, age, skills, profilePhoto, _id, achievements } =
      userData;
    res.json({
      message: "Fetch successfully",
      user: { firstName, lastName, about, gender, age, skills, profilePhoto, _id, achievements },
    });
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

    const { user } = req;

    // finding the user and updating their data
    await User.updateOne({ _id: user._id }, data);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// GET /profile/password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const currentPassword = req.body.password;

    // validate the data
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(
        "Password must have: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
      );
    }

    const { user } = req;

    // Matching password with passwordHash
    const isPasswordMatched = await user.matchPasswordWithPasswordHash(
      currentPassword
    );

    if (!isPasswordMatched) {
      throw new Error("Incorrect Password");
    }
    const newPasswordHash = await user.getPasswordHash(newPassword);
    await User.updateOne({ _id: user._id }, { password: newPasswordHash });
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
