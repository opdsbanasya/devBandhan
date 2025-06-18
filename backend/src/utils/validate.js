const validator = require("validator");

const validateSignupData = (data) => {
  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid email");
  }
};

const validateUpdateData = (data) => {
  const allowedUpdated = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "skills",
    "profilePhoto",
    "about",
    "achievements"
  ];
  const isUpdatesAllowed = Object.keys(data).every((key) =>
    allowedUpdated.includes(key)
  );

  if (!isUpdatesAllowed) {
    throw new Error("Updates are not allowed");
  }

  if(data?.achievements.length>10){
    throw new Error("Your achievements are too large")
  }

  if (data?.skills && data?.skills.length > 10) {
    throw new Error("Skill can't be more than 10");
  }
};

const validateLoginData = (data) => {
    if(!validator.isEmail(data.email)){
        throw new Error("Invalid Email");
    }
}

module.exports = { validateSignupData, validateUpdateData, validateLoginData };
