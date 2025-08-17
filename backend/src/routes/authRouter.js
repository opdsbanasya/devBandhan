const express = require("express");
const User = require("../models/user");
const { validateSignupData, validateLoginData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const { sendMailViaNodeMailer } = require("../utils/nodeMailer");
const validator = require("validator");
const authRouter = express.Router();
const {
  otpHTML,
  passwordChnageUpdateHtml,
  emailSubjects,
} = require("../utils/constants");
const { sendEmail } = require("../utils/sendEmail");

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
    sanitizedData.otpExpiryTime = new Date(Date.now() + 60000 * 60);

    // Registering the user on DB
    const user = new User(sanitizedData);
    user.isVerified = false;
    const userData = await user.save();

    const html = otpHTML(otp);
    await sendEmail({
      subject: emailSubjects.otp,
      html,
      adresses: [{ address: sanitizedData?.email }],
    });

    res.json({
      message: "User has been added to database. Next, verify the code",
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
      if (user.isVerified == false) {
        return res.status(401).json({ message: "Please verify your email" });
      }

      // Creating JWT Token
      const token = await user.getJWT();

      const {
        firstName,
        lastName,
        about,
        gender,
        age,
        skills,
        profilePhoto,
        _id,
        achievements,
        dateOfBirth,
        profession,
        socialLinks,
      } = user;

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
          _id,
          achievements,
          dateOfBirth,
          profession,
          socialLinks,
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

authRouter.post("/authcode/send", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpHash = await bcrypt.hash(otp.toString(), 10);

    user.otp = otpHash;
    user.otpExpiryTime = new Date(Date.now() + 60000 * 60);
    user.isVerified = false;
    await user.save();

    const html = otpHTML(otp);
    // await sendMailViaNodeMailer({ otp, email, html });
    await sendEmail({
      subject: emailSubjects.otp,
      html,
      adresses: [{ address: user?.email }],
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/authcode/verify", async (req, res) => {
  try {
    const { email, otpFromUser } = req.body;
    const user = await User.findOne({ email: email });
    console.log("OTP verifing...");
    if (!user) {
      throw new Error("User not found");
    }

    const isOtpExpired = new Date(Date.now()) > user?.otpExpiryTime;

    if (isOtpExpired) {
      throw new Error("OTP is expired");
    }

    const isOtpMatched = await bcrypt.compare(otpFromUser, user?.otp);

    if (!isOtpMatched) {
      throw new Error("Invalid OTP");
    }

    user.isVerified = true;
    await user.save();
    console.log("OTP verified");

    res.json({ message: "Verified!", status: 200 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.patch("/reset/password/", async (req, res) => {
  try {
    const newPassword = req.body?.newPassword;
    const email = req.body?.email;

    // validate the email
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    // validate the data
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(
        "Password must have: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
      );
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (!user?.isVerified) {
      throw new Error("please complete varification!");
    }

    // Generating new passwordHash
    const newPasswordHash = await user.getPasswordHash(newPassword);
    user.password = newPasswordHash;
    await user.save();

    const html = passwordChnageUpdateHtml(user.firstName);
    await sendMailViaNodeMailer({ email, html });

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = authRouter;
