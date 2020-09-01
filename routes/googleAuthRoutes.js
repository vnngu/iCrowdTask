require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleAuthController = require("../controllers/googleAuthController");
const { isUserNotAuthenticated } = require("../functions/checkAuthentication");

router.get(
  "/auth/google",
  isUserNotAuthenticated,
  passport.authenticate("google", { scope: ["profile"] }),
  googleAuthController.google_auth
);
router.get(
  "/auth/google/callback",
  isUserNotAuthenticated,
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuthController.google_auth_call_back
);

module.exports = router;
