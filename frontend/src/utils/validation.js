import validator from "validator";

export const signUpDataValidation = (data) => {
  const errors = {};
  console.log(data);

  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const email = data.email.trim().toLowerCase();
  const password = data.password;
  const dateOfBirth = data.dateOfBirth;

  // fistName
  if (firstName.length === 0) {
    errors.firstNameError = "Enter your firstname";
  } else if (firstName.length >= 50) {
    errors.firstNameError = "Your firstname is too longer";
  } else if (firstName.length < 3) {
    errors.firstNameError = "Your firstname is too short";
  }

  // lastName
  if (lastName.length === 0) {
    errors.lastNameError = "Enter your lastname";
  } else if (lastName.length >= 50) {
    errors.lastNameError = "Your lastname is too longer";
  } else if (firstName.length < 3) {
    errors.firstNameError = "Your firstname is too short";
  }

  // email
  if (!validator.isEmail(email)) {
    errors.emailError = "Enter a valid email";
  }

  // password
  if (!validator.isStrongPassword(password)) {
    errors.passwordError = "Enter a strong password";
  }

  // dateOfBirth
  if (!validator.isDate(dateOfBirth)) {
    errors.dobError = "Enter a valid date";
  }

  const domain = data.domain;
  const skills = data.skills;
  const about = data.about && data.about.trim();
  const photoUlr = data.photoUlr && data.photoUlr.trim();

  return errors;
};

export const loginDataValiadation = (data) => {
  const email = data.email;
  const password = data.password;
  const loginErrors = {};

  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email.");
  }

  return true;
};
