const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.get("/forgot", resetPasswordController.get_email);
router.post("/forgot", resetPasswordController.post_email);
router.get(
  "/reset-password/:token",
  resetPasswordController.get_reset_password
);
router.post(
  "/reset-password/:token",
  resetPasswordController.post_reset_password
);

module.exports = router;
