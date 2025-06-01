const mongoose = require("mongoose");

const URI = "YOUR URL TO CONNECT DB";

const connetDB = async () => {
  await mongoose.connect(URI);
};

module.exports = {connetDB};


