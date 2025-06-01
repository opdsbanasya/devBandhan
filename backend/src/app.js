const express = require("express");
const {connetDB } = require("./config/database");
const User = require("./models/user")

const app = express();

app.post("/signup", async (req, res) => {
  console.log(req.query)
  const userData = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    password: req.query.password,
    gender: req.query.gender
  }
  const user = new User(userData);

  await user.save();  
  res.send("User has been added to database.")
})

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
