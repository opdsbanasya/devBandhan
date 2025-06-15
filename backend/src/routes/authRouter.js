const express = require("express");
const User = require("../models/user");
const { validateSignupData, validateLoginData } = require("../utils/validate");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// POST /signup API
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate Data
    const data = req.body;
    validateSignupData(data);

    // Encrypt the password
    const passwordHash = await bcrypt.hash(data.password, 10);
    data.password = passwordHash;

    // Registering the user on DB
    const user = new User(data);
    await user.save();
    res.json({ message: "User has been added to database." });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// POST /login API
authRouter.post("/login", async (req, res) => {
  try {
    // Validate email format
    validateLoginData(req.body);

    // Finding user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    // Matching password with passwordHash
    const isPasswordMatched = await user.matchPasswordWithPasswordHash(
      req.body.password
    );

    if (isPasswordMatched) {
      // Creating JWT Token
      const token = await user.getJWT();

      const { firstName, lastName, about, gender, age, skills, profilePhoto } =
        user;

      // Sending Cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 86400000),
      });
      res.json({
        message: "Login Successful!!",
        userData: {
          firstName,
          lastName,
          about,
          gender,
          age,
          skills,
          profilePhoto,
        },
      });
    } else {
      throw new Error("Wrong Email and Password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// POST /logout API
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  // res.cookie("token", null, {expires: new Date(Date.now())})
  res.json({ message: "logout successful 📤" });
});

module.exports = authRouter;
