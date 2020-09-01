const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  isUserNotAuthenticated,
  isUserAuthenticated,
} = require("../functions/checkAuthentication");
const passport = require("passport");

router.get("/signup", isUserNotAuthenticated, authController.signup_get);
router.post("/signup", isUserNotAuthenticated, authController.signup_post);
router.get("/login", isUserNotAuthenticated, authController.login_get);
router.post(
  "/login",
  isUserNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.get("/logout", isUserAuthenticated, authController.log_out_get);
router.get("/session-save", authController.save_session);

module.exports = router;
