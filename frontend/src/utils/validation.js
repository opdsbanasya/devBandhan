import axios from "axios";
import validator from "validator";
import { BASE_URL } from "./constants";

export const signUpDataValidation = (
  data,
  validationErrors,
  setValidationErrors
) => {
  const errors = {};

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
  } else {
    const today = new Date();
    const dob = new Date(dateOfBirth)
    var years = today.getFullYear() - dob.getFullYear();

    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() == dob.getMonth() &&
        today.getDate() < dob.getDate())
    ) {
      years--;
    }

    if(years < 15) {
      errors.dobError = "Age must be 15+";
    }
  }

  setValidationErrors({ ...errors });

  return errors;
};

export const loginDataValiadation = (data, setError) => {
  const email = data.email;
  const password = data.password;

  if (!validator.isEmail(email)) {
    setError("Please Enter a valid email");
    return;
  }

  if (password === "") {
    setError("please enter your password");
    return;
  }

  if (validator.isEmail(email)) {
    setError("");
  }

  return true;
};

export const editDataValidation = async (
  data,
  user,
  { basicData, skills, achievements, profileImage, profession, links }
) => {
  try {
    const {
      about,
      dateOfBirth,
      male,
      female,
      other,
      profileImageLink,
      professionData,
      platformName,
      platformUrl,
    } = data || {};

    let editData = {};

    let gender = "";
    if (basicData && male.current.checked) {
      gender = "male";
    } else if (basicData && female.current.checked) {
      gender = "female";
    } else if (basicData && other.current.checked) {
      gender = "other";
    }

    if (basicData) {
      editData = {
        ...editData,
        about: about.current.value,
        dateOfBirth: dateOfBirth.current.value,
        gender,
      };
    } else if (skills) {
      editData = { ...editData, skills: [...user.skills] };
    } else if (achievements) {
      editData = { ...editData, achievements: [...user.achievements] };
    } else if (profileImage) {
      editData = { ...editData, profilePhoto: profileImageLink.current.value };
    } else if (profession) {
      editData = { ...editData, profession: professionData.current.value };
    } else if (platformName && platformUrl) {
      editData = {
        ...editData,
        socialLinks: {
          ...user?.socialLinks,
          [platformName.current.value]: platformUrl.current.value,
        },
      };
    }

    const response = await axios.patch(`${BASE_URL}/profile/edit`, editData, {
      withCredentials: true,
    });
    return editData;
  } catch (err) {
    console.log(err);
  }
};
