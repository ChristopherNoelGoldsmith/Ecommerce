const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

router.route("/login").post(authController.loginUsers);

router
	.route("/profile")
	.get(authController.protect, usersController.usersProfile);

router.route("/register").post(authController.registerUsers);
router.route("/persist").post(authController.persistLogin);

/*
router
	.route(":id")
	.get(authController.getUsers)
	.patch(authController.updateUsers)
	.delete(authController.deleteUsers);
*/
module.exports = router;
