//Dependancies
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
//Imports
const User = require("../models/user");
const AppError = require("../utilities/appError");
const catchAsyncFunction = require("../utilities/catchAsync");

// REGISTRATION!
const registerUsers = catchAsyncFunction(async (req, res, next) => {
	const newUser = await User.create(req.body);

	res.status(201).json({
		status: "SUCCESS",
		data: {
			newUser,
		},
	});
});

//LOGIN!
const loginUsers = catchAsyncFunction(async (req, res, next) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).lean();

	//ERROR HANDLING 1 ) USER NOT FOUND ------
	if (!user) {
		return next(new AppError("ERROR: user not found", 404));
	}

	//PERSISTANCE 1 ) JWT CREATION FOR PERSISTANCE ------
	const token = jwt.sign(
		{ id: user._id, username: user.username, permissions: "USER" },
		JWT_SECRET
	);
	//SECURITY 2 ) BCRYPT PASSWORD VALIDATION ------
	if (await bcrypt.compare(password, user.password)) {
		//PERSISTANCE 2 ) JWT TOKEN TO CLIENT ------
		return res
			.status(201)
			.json({ status: "SUCCESS", data: { username, token } });
	}
});

const persistLogin = catchAsyncFunction(async (req, res) => {
	const { token } = req.body;
	const user = jwt.verify(token, JWT_SECRET);
	const { _id, username } = user;
	res.status(201).json({ status: "SUCCESS", username: username });
});

const models = { registerUsers, loginUsers, persistLogin };

module.exports = models;
