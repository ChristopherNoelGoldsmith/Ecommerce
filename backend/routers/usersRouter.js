const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/login").post(usersController.loginUser);
router.route("/register").post(usersController.registerUser);
router.route("/persist").post(usersController.persistLogin);

module.exports = router;
