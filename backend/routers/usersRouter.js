const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/login").post(authController.loginUsers);

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
