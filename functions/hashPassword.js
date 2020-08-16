const bcrypt = require("bcrypt");
const User = require("../models/User");
async function hashPassword(password, res) {
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(password, salt);
  } catch {
    res.redirect("/server-error");
  }
  return hashedPassword;
}
async function reHashPassword(password, res, email) {
  let user;
  await User.findOne({ email })
    .then((foundUser) => (user = foundUser))
    .catch((err) => res.redirect("/server-error"));
  if (user === null) return { success: false, message: "no_user" };
  if (await bcrypt.compare(password, user.password)) {
    return { success: true, message: "correct" };
  } else {
    return { success: false, message: "incorrect" };
  }
}
module.exports = { hashPassword, reHashPassword };
