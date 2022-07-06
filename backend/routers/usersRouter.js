const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

router.route("/login").post(authController.loginUsers);

router
	.route("/profile")
	.get(authController.protect, usersController.usersProfile);

router
	.route("/update-password")
	.patch(authController.protect, authController.updatePassword);
router
	.route("/current-user")
	.patch(authController.protect, usersController.updateMe)
	.delete(authController.protect, usersController.deleteMe);
router
	.route("/:id")
	.get(usersController.getAllUsers)
	.delete(
		authController.protect,
		authController.restrict("ADMIN"),
		usersController.deleteUsers
	);

router.route("/reset-password").post(usersController.lostPassword);
router.route("/reset-password/:token").patch(usersController.resetPassword);
router.route("/register").post(authController.registerUsers);
//router.route("/persist").post(authController.persistLogin);

/*
router
	.route(":id")
	.get(authController.getUsers)
	.patch(authController.updateUsers)
	.delete(authController.deleteUsers);
*/
module.exports = router;
