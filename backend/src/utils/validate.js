const validator = require("validator");

const validateSignupData = (data) => {
  const dateOfBirth = data?.dateOfBirth && new Date(data?.dateOfBirth);

  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid email");
  }
  if (dateOfBirth && !validator.isDate(dateOfBirth)) {
    throw new Error("Invalid Date");
  }
};

const validateUpdateData = (data) => {
  const dateOfBirth = data?.dateOfBirth && new Date(data?.dateOfBirth);
  const allowedUpdated = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "skills",
    "profilePhoto",
    "about",
    "achievements",
    "dateOfBirth",
  ];
  const isUpdatesAllowed = Object.keys(data).every((key) =>
    allowedUpdated.includes(key)
  );

  if (!isUpdatesAllowed) {
    throw new Error("Updates are not allowed");
  }

  if (data?.achievements && data?.achievements.length > 10) {
    throw new Error("Your achievements are too large");
  }

  if (data?.skills && data?.skills.length > 10) {
    throw new Error("Skill can't be more than 10");
  }

  if (dateOfBirth && !validator.isDate(dateOfBirth)) {
    throw new Error("Invalid Date");
  }
};

const validateLoginData = (data) => {
  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid Email");
  }
};

module.exports = { validateSignupData, validateUpdateData, validateLoginData };
