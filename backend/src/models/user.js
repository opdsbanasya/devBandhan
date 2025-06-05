const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 3,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email");
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword){
            throw new Error("Password must have: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1")
        }
      }
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    age: {
      type: Number,
      min: 15,
      max: 80,
    },
    skills: {
      type: [String],
    },
    profilePhoto: {
      type: String,
      default:
        "https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid URL")
            }
        }
    },
    about: {
      type: String,
      default:
        "Curious learner, creative thinker, problem solver, tech enthusiast. Passionate about growth, innovation, and meaningful connections. Always open to opportunities.",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
