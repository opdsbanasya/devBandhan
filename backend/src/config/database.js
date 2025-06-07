const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.URI;

const connetDB = async () => {
  await mongoose.connect(URI);
};

module.exports = {connetDB};


