let email = document.querySelector("#email");
let password = document.querySelector("#password");
let saveSession = document.querySelector("#save");
let googleButton = document.querySelector("#google-button");
function validate(event) {
  // event.preventDefault();
  let submittedEmail = email.value.trim();
  let submittedPassword = password.value.trim();

  if (!validator.isEmail(submittedEmail)) {
    alert("Please provide correct email");
    email.value = "";
    email.focus();
    return false;
  }
  if (!validator.isLength(submittedPassword, { min: 8 })) {
    alert("Your password must be at least 8 character");
    password.value = "";
    password.focus();
    return false;
  }
  document.cookie = "isSave=" + saveSession.checked;
  return true;
}
