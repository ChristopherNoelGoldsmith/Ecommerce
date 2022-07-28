const express = require("express");
//const stripe = require("../controllers/stripe");
const router = express.Router();
const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

//////////////////////////////////////
/*
//////////////////////
LOGIN
//////////////////////
*/

router.route("/login").post(authController.loginUsers);

//////////////////////////////////////
/*
//////////////////////
FOR MANAGING THE USERS CART
//////////////////////
*/

router
	.route("/cart")
	.get(authController.protect)
	.post(authController.protect)
	.patch(authController.protect, usersController.updateCart)
	.delete(authController.protect, usersController.clearCart);

//////////////////////////////////////
/*
//////////////////////
FOR MANAGING THINGS ON 
THE CURRENT USERS
//////////////////////
*/
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

//////////////////////////////////////
/*
//////////////////////
ROUTES FOR THE USER CART
//////////////////////
*/

//router.route("/cart");

//////////////////////////////////////
/*
//////////////////////
TARGETS SPECIFIC USERS
//////////////////////
*/
router
	.route("/:id")
	.get(usersController.getAllUsers)
	.delete(
		authController.protect,
		authController.restrict("ADMIN"),
		usersController.deleteUsers
	);

//////////////////////////////////////
/*
//////////////////////
PASSWORD MANAGMENT
//////////////////////
*/
router.route("/reset-password").post(usersController.lostPassword);
router.route("/reset-password/:token").patch(usersController.resetPassword);
router.route("/register").post(authController.registerUsers);
module.exports = router;
