const express = require("express");
const { connetDB } = require("./config/database");
const User = require("./models/user");
const {
  validateSignupData,
  validateUpdateData,
  validateLoginData,
} = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validate Data
    const data = req.body;
    validateSignupData(data);

    // Encrypt the password
    const passwordHash = await bcrypt.hash(data.password, 10);
    data.password = passwordHash;
    console.log(data.password);

    // Registering the user on DB
    const user = new User(data);
    await user.save();
    res.send("User has been added to database.");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// POST /login API
app.post("/login", async (req, res) => {
  try {
    // Validate email format
    validateLoginData(req.body);

    // Finding user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    // Matching password with passwordHash
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordMatched) {
      // Creating JWT Token
      const token = await jwt.sign({ _id: user._id }, "TINDER@Dev$", {
        expiresIn: "7d",
      });

      // Sending Cookies
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 86400000),
      });
      res.send("Login Successful!!");
    } else {
      throw new Error("Wrong Email and Password");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Get /profile API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// GET API - find user by email
app.get("/user", async (req, res) => {
  try {
    // Finding user by email
    const users = await User.find({ email: req.body.email });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// GET /feed API - finding all users
app.get("/feed", async (req, res) => {
  try {
    // finding all users
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// DELETE /user API - to delete an user
app.delete("/user", async (req, res) => {
  try {
    // finding the user and deleting the user
    const user = await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// PATCH /user API - to update an user
app.patch("/user/:userId", async (req, res) => {
  try {
    const data = req.body;

    // validate the data
    validateUpdateData(data);

    // finding the user and updating their data
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

connetDB()
  .then(() => {
    console.log("Connection established!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error occured");
  });
