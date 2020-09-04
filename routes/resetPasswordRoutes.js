const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");
const { isUserNotAuthenticated } = require("../functions/checkAuthentication");

router.get(
  "/forgot",
  isUserNotAuthenticated,
  resetPasswordController.get_email
);
router.post(
  "/forgot",
  isUserNotAuthenticated,
  resetPasswordController.post_email
);
router.get(
  "/reset-password/:token",
  isUserNotAuthenticated,
  resetPasswordController.get_reset_password
);
router.post(
  "/reset-password/:token",
  isUserNotAuthenticated,
  resetPasswordController.post_reset_password
);

module.exports = router;
