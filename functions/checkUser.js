const User = require("../models/User");
async function checkUserExist(email) {
  let user;
  await User.findOne({ email })
    .then((foundUser) => (user = foundUser))
    .catch((err) => res.redirect("/server-error"));
  if (user) {
    return { exist: true, message: "The email was already regiestered" };
  } else {
    return { exist: false, message: "" };
  }
}

module.exports = checkUserExist;
