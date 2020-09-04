require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
sgMail.setApiKey(SENDGRID_API_KEY);

const sendToken = (user) => {
  const URL = "https://icrowdtask.herokuapp.com";
  //const URL = "http://localhost:3000";
  const tokenLink = `${URL}/recovery/reset-password/${user.recoverPasswordToken}`;
  const msg = {
    to: user.email,
    from: "nguyenvietnam2401@gmail.com", // Use the email address or domain you verified above
    subject: "iCrowdTask: Reset Password",
    html: `Please <a href="${tokenLink}">click here</a> to reset your password. This link will be invalid after 15 minutes`,
  };
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Email Sent");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

const get_email = (req, res) => {
  res.render("forgotpassword", { message: null });
};
const post_email = (req, res) => {
  const { email } = req.body;

  let recoverPasswordToken = uuid.v4();
  let recoverTokenExpirationDate = Date.now() + 60 * 15 * 1000; // ms
  User.findOneAndUpdate(
    { email },
    { recoverPasswordToken, recoverTokenExpirationDate }
  )
    .then(async (user) => {
      if (user === null) {
        res.render("forgotpassword", { message: "Email not found" });
      } else {
        const savedUser = await User.findOne({ email });
        // Send email
        sendToken(savedUser);
        res.render("forgotpassword", { message: "Email sent" });
      }
    })
    .catch(() => res.redirect("/server-error"));
};
const get_reset_password = (req, res) => {
  const token = req.params.token;
  User.findOne({
    recoverPasswordToken: token,
    recoverTokenExpirationDate: { $gt: Date.now() },
  }).then((user) => {
    if (user === null) {
      res.render("invalidtoken");
    } else {
      res.render("resetpassword", { message: null, token });
    }
  });
};
const post_reset_password = async (req, res) => {
  const token = req.params.token;
  let { password, rePassword } = req.body;
  if (!validator.equals(password.trim(), rePassword.trim())) {
    res.render("resetpassword", {
      message: "Passwords do not match",
      token,
    });
  } else if (!validator.isLength(password.trim(), { min: 8 })) {
    res.render("resetpassword", {
      message: "Password must be at least 8 characters",
      token,
    });
  } else {
    // Hash password
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password.trim(), salt);
    User.findOneAndUpdate(
      {
        recoverPasswordToken: token,
        recoverTokenExpirationDate: { $gt: Date.now() },
      },
      {
        password,
        recoverTokenExpirationDate: undefined,
        recoverPasswordToken: undefined,
      }
    )
      .then((user) => {
        if (user === null) {
          res.render("resetpassword", { message: "Invalid link", token });
        } else {
          res.redirect("/login");
        }
      })
      .catch(() =>
        res.render("resetpassword", { message: "Invalid link", token })
      );
  }
};

module.exports = {
  get_email,
  post_email,
  get_reset_password,
  post_reset_password,
};
