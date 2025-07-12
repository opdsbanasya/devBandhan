const express = require("express");
const User = require("../models/user");
const { validateSignupData, validateLoginData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const { sendMailViaNodeMailer } = require("../utils/nodeMailer");

const authRouter = express.Router();

// POST /signup API
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate Data
    const data = req.body;
    const sanitizedData = validateSignupData(data);

    // Encrypt the password
    const passwordHash = await bcrypt.hash(sanitizedData.password, 10);
    sanitizedData.password = passwordHash;

    // Encrypt the otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpHash = await bcrypt.hash(otp.toString(), 10);
    
    sanitizedData.otp = otpHash;
    sanitizedData.isOtpExpired = false;
    sanitizedData.otpExpiryTime = new Date(Date.now() + 60000);

    // Registering the user on DB
    const user = new User(sanitizedData);
    const userData = await user.save();

    await sendMailViaNodeMailer(otp, sanitizedData.email);

    res.json({
      message: "User has been added to database. Next, verify the code",
      userData,
    });
  } catch (err) {
    res.status(400).send(err.message);
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

      const {
        _id,
        firstName,
        lastName,
        about,
        gender,
        age,
        skills,
        profilePhoto,
        achievements,
        profession,
      } = user;

      // Sending Cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 86400000),
      });
      res.json({
        message: "Login Successful!!",
        userData: {
          _id,
          firstName,
          lastName,
          about,
          gender,
          age,
          skills,
          profilePhoto,
          achievements,
          profession,
        },
      });
    } else {
      throw new Error("Wrong Email and Password");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// POST /logout API
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  // res.cookie("token", null, {expires: new Date(Date.now())})
  res.json({ message: "logout successful 📤" });
});

authRouter.post("/authcode/verify", async (req, res) => {
  try {
    const {email, otpFromUser} = req.body;
    const user = await User.findOne({email: email});

    const isOtpExpired = new Date(Date.now()) > user.otpExpiryTime;
    
    if(isOtpExpired) {
      throw new Error("otp is expired");
    }
    
    console.log(otpFromUser.toString(), user.otp);
    
    const isOtpMatched = await bcrypt.compare(otpFromUser.toString(), user.otp);
    console.log(isOtpMatched);
    
    if(!isOtpMatched) {
      throw new Error("Invalid otp")
    }

    res.json({ message: "verified!"})

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = authRouter;
