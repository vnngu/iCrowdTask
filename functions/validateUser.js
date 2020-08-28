const validator = require("validator");
function validateUser(req) {
  const {
    country,
    firstName,
    lastName,
    email,
    password,
    address,
    city,
    state,
    zipCode,
    phoneNumber,
  } = req.body;

  if (validator.isEmpty(country)) {
    return { success: false, message: "Please choose your country" };
  }
  if (validator.isEmpty(firstName)) {
    return { success: false, message: "Please enter first name" };
  }
  if (validator.isEmpty(lastName)) {
    return { success: false, message: "Please enter last name" };
  }
  if (!validator.isEmail(email)) {
    return { success: false, message: "Please provide correct email" };
  }
  if (!validator.isLength(password, { min: 8 })) {
    return {
      success: false,
      message: "Your password must be at least 8 character",
    };
  }
  if (validator.isEmpty(password)) {
    return {
      success: false,
      message: "Your password must be at least 8 character",
    };
  }
  if (validator.isEmpty(address)) {
    return {
      success: false,
      message: "Please provide your home address",
    };
  }
  if (validator.isEmpty(city)) {
    return {
      success: false,
      message: "Please provide City",
    };
  }
  if (validator.isEmpty(state)) {
    return {
      success: false,
      message: "Please provide State, Province or Region",
    };
  }
  if (
    phoneNumber &&
    !validator.isMobilePhone(phoneNumber, [
      "en-AU",
      "en-CA",
      "en-GB",
      "en-GG",
      "en-GH",
      "en-HK",
      "en-MO",
      "en-IE",
      "en-IN",
      "en-KE",
      "en-MT",
      "en-MU",
      "en-NG",
      "en-NZ",
      "en-PK",
      "en-PH",
      "en-RW",
      "en-SG",
      "en-SL",
      "en-UG",
      "en-US",
      "en-TZ",
      "en-ZA",
      "en-ZM",
      "en-ZW",
    ])
  ) {
    return {
      success: false,
      message: "Please provide the correct phone number",
    };
  }
  return { success: true, message: "success" };
}

function validateUpdate() {}

module.exports = { validateUser, validateUpdate };
