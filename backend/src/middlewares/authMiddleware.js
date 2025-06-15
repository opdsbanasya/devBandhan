const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  try {
    // Reading Token
    const { token } = req.cookies;

    // Handling if token is missing
    if(!token){
      return res.status(401).send("Invalid token");
    }

    // validating the token
    const decodedMessage = await jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = decodedMessage;

    // handling the case if '_id' is not their
    if (!_id) {
      return res.status(400).send("Invalid id");
    }

    // finding the user by userId
    const user = await User.findById(_id);

    // Hnadling the case if user not found
    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
