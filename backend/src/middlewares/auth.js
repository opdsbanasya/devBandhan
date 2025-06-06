const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  try {
    // Reading Token
    const { token } = req.cookies;

    // validating the token
    const decodedMessage = await jwt.verify(token, "TINDER@Dev$");

    const { _id } = decodedMessage;

    // handling the case if '_id' is not their
    if (!_id) {
      res.status.send("Invalid token");
    }

    // finding the user by userId
    const user = await User.findById(_id);

    // Hnadling the case if user not found
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
