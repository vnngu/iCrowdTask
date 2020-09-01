const User = require("../models/User");
const validate = require("../functions/validateRequest");
const { hashPassword, reHashPassword } = require("../functions/hashPassword");
const checkUserExist = require("../functions/checkUser");
const SendEmail = require("../functions/SendEmail");

// User Registration
const signup_get = (req, res) => {
  res.render("reqsignup", { message: null, visible: "" });
};

const signup_post = (req, res) => {
  // Mongoose generates ID automically by defaul
  const { success, message } = validate(req);
  if (success) {
    checkUserExist(req.body.email).then((existingUser) => {
      if (!existingUser.exist) {
        // User Info
        const address = req.body.address1 + req.body.address2;
        address.trim();
        delete req.body["address1"];
        delete req.body["address2"];
        delete req.body["rePassword"];
        const userInfo = { ...req.body, address };

        // Send Welcome email
        SendEmail.SendGrid(req.body.email);

        const user = new User(userInfo);
        user
          .save()
          .then(() => res.redirect("/login"))
          .catch((err) => console.log(err));
      } else {
        res.render("reqsignup", {
          message: existingUser.message,
          visible: "visibility: visible",
        });
      }
    });
  } else {
    res.render("reqsignup", { message });
  }
};
// Login In
const login_get = (req, res) => {
  res.cookie("isSave", "false", { httpOnly: true, maxAge: 3600 * 1000 });
  res.render("reqlogin", { message: null });
};
const login_post = (req, res) => {
  const { password, email } = req.body;
  let success = false;
  reHashPassword(password, res, email)
    .then((status) => {
      if (status.success) {
        res.redirect("/task");
      } else {
        if (status.message === "no_user") {
          res.render("reqlogin", { ...status });
        } else if (status.message === "incorrect") {
          res.render("reqlogin", { ...status });
        }
      }
    })
    .catch((err) => console.log(err));
};

const log_out_get = (req, res) => {
  req.logout();
  res.redirect("/login");
};

const save_session = (req, res) => {
  const cookies = req.cookies;
  if (cookies.isSave === "false") {
    req.logout();
    res.redirect("/login");
  }
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  log_out_get,
  save_session,
};
