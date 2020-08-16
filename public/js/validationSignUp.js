let form = document.querySelector(".form-body");
let country = document.querySelector("#country");
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let rePassword = document.querySelector("#re-password");
let address1 = document.querySelector("#address-1");
let address2 = document.querySelector("#address-2");
let city = document.querySelector("#city");
let state = document.querySelector("#state");
let zipCode = document.querySelector("#zip-code");
let phoneNumber = document.querySelector("#phone-number");
let incorrectBadge = document.querySelector(".registration .incorrect");
let message = document.querySelector(".registration .incorrect .message");

function validateSignUp(event) {
  let submittedCountry = country.value;
  let submittedFirstName = firstName.value.trim();
  let submittedLastName = lastName.value.trim();
  let submittedEmail = email.value.trim();
  let submittedPassword = password.value.trim();
  let submittedPrePassword = rePassword.value.trim();
  let submittedAddress1 = address1.value.trim();
  let submittedAddress2 = address2.value.trim();
  let submittedCity = city.value.trim();
  let submittedState = state.value.trim();
  let submittedZipCode = zipCode.value.trim();
  let submittedPhoneNumber = phoneNumber.value.trim();
  if (validator.isEmpty(submittedCountry)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please choose your country";
    country.focus();
    return false;
  }
  if (validator.isEmpty(submittedFirstName)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please enter first name";
    firstName.focus();
    return false;
  }
  if (validator.isEmpty(submittedLastName)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please enter last name";
    lastName.focus();
    return false;
  }
  if (!validator.isEmail(submittedEmail)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please provide correct email";
    email.value = "";
    email.focus();
    return false;
  }
  if (!validator.equals(submittedPassword, submittedPrePassword)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Password doesn't match with Confirm password";
    password.value = "";
    rePassword.value = "";
    password.focus();
    return false;
  }
  if (!validator.isLength(submittedPassword, { min: 8 })) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Your password must be at least 8 character";
    password.value = "";
    rePassword.value = "";
    password.focus();
    return false;
  }
  if (validator.isEmpty(submittedAddress1)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please provide your home address";
    address1.value = "";
    address2.value = "";
    address1.focus();
    return false;
  }
  if (validator.isEmpty(submittedCity)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please provide City";
    city.value = "";
    city.focus();
    return false;
  }
  if (validator.isEmpty(submittedState)) {
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please provide State, Province or Region";
    state.value = "";
    state.focus();
    return false;
  }
  if (
    submittedPhoneNumber &&
    !validator.isMobilePhone(submittedPhoneNumber, [
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
    incorrectBadge.style.visibility = "visible";
    message.innerHTML = "Please provide the correct phone number";
    phoneNumber.value = "";
    phoneNumber.focus();
    return false;
  }
  return true;
}
