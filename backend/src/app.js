const express = require("express");
const { connetDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User has been added to database.");
  } catch (err) {
    res.status(400).send("Error occured to saving user Data", err.message);
  }
});

// GET API - find user by email
app.get("/user", async (req, res) => {
  try {
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
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// DELETE /user API - to delete an user
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// PATCH /user API - to update an user
app.patch("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
      returnDocument: "after",
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
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
