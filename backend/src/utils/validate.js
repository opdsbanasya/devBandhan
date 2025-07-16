const validator = require("validator");

const validateSignupData = (data) => {
  const dateOfBirth = data?.dateOfBirth && new Date(data?.dateOfBirth);

  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid email");
  }
  if (dateOfBirth && !validator.isDate(dateOfBirth)) {
    throw new Error("Invalid Date");
  }

  const today = new Date();

  var years = today.getFullYear() - dateOfBirth.getFullYear();

  if (
    today.getMonth() < dateOfBirth.getMonth() ||
    (today.getMonth() == dateOfBirth.getMonth() &&
      today.getDate() < dateOfBirth.getDate())
  ) {
    years--;
  }

  data.age = years;
  return data;
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
    "profession",
    "socialLinks",
  ];
  const isUpdatesAllowed = Object.keys(data).every((key) =>
    allowedUpdated.includes(key)
  );

  if (!isUpdatesAllowed) {
    throw new Error("Updates are not allowed");
  }

  if (data?.achievements && data?.achievements.length > 10) {
    throw new Error("Achievements can't be more than 10");
  }

  if (data?.skills && data?.skills.length > 10) {
    throw new Error("Skill can't be more than 10");
  }

  if (dateOfBirth && !validator.isDate(dateOfBirth)) {
    throw new Error("Invalid Date");
  }

  if (data?.profession) {
    if (data?.profession.length > 80) {
      throw new Error("Profession length should be max 80");
    }
    if (data?.profession.length < 2) {
      throw new Error("Profession length should be min 2");
    }
  }

  if (data?.socialLinks) {
    if (data?.socialLinks.length > 4) {
      throw new Error("Links can't be more than 4");
    }
    for (let link in data?.socialLinks) {
      if (!validator.isURL(data?.socialLinks[link])) {
        throw new Error(`${link} link is invalid`);
      }
    }
  }

  if (data?.profilePhoto && !validator.isURL(data?.profilePhoto)) {
    throw new Error("Invalid Photo URL");
  }
};

const validateLoginData = (data) => {
  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid Email");
  }
};

module.exports = { validateSignupData, validateUpdateData, validateLoginData };
