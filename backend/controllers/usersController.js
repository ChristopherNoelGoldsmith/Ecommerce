const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
//status messages and error handling
const catchAsyncFunction = require("../utilities/catchAsync");
const statusMessages = require("../status");
//
const app = express();
const { status } = statusMessages();
const JWT_SECRET = "nfilidsndf)I(I5nb";

//REGISTRATION!

const registerUser = catchAsyncFunction(async (req, res, next) => {
	const newId = req.body.username + 100;
	//Get Values from response and hash;
	const { username, password: plainTextPassword } = req.body;
	const password = await bcrypt.hash(plainTextPassword, 10);
	await User.create({
		id: newId,
		username,
		password,
	});
	console.log(`USER: ${username} | CREATED!`);

	res.json({ status: status.success, data: username });
});

//LOGIN! -----------------------

const loginUser = catchAsyncFunction(async (req, res, next) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).lean();
	//ERROR HANDLING ------
	if (!user) {
		console.log("ERROR: user not found");
		res.json({ status: status.error, message: "INVALID USER INFORMATION!" });
	}
	console.log(user);
	const token = jwt.sign(
		{ id: user._id, username: user.username, permissions: "USER" },
		JWT_SECRET
	);
	//used to validate the hashed password via bcrypt
	if (await bcrypt.compare(password, user.password)) {
		console.log(`USER: ${username} | HAS LOGGED IN!`);
		return res.json({ status: status.success, token: token });
	}
	console.log("what?");
	return res.json({
		error: status.error,
		message: `INVALID USER INFORMATION!`,
	});
});

const persistLogin = async (req, res) => {
	const { token } = req.body;
	try {
		const user = jwt.verify(token, JWT_SECRET);
		const { _id, username } = user;
		res.json({ status: status.success, username: username });
	} catch (error) {
		console.log(error);
	}
};

//INCOMPLETE CODE ON VERIFYING AN ADMIN ACCOUNT
const verifyAdmin = async (req, res) => {
	try {
		const { credentials } = req.body;
		const checkAdmin = jwt.verify(credentials, JWT_SECRET);
		const { isAdmin } = checkAdmin;
		res.json({ status: status.success, message: "Verified Admin" });
		if (isAdmin === true) return next();

		res.json({ status: status.error, message: "Invalid Credentials!" });
	} catch (err) {
		console.log(err);
	}
};

const model = { persistLogin, loginUser, registerUser, verifyAdmin };

module.exports = model;
