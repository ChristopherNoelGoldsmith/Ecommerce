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
	// SECURITY 1 ) DESTRUCTURE BODY TO ENSURE NO EXTRA FIELDS ARE SUBMITTED TO THE SCHEMA.
	const { username, password, passwordConfirm, email } = req.body;

	const newUser = await User.create({
		username,
		password,
		passwordConfirm,
		email,
	});

	// SECURITY 2 ) JSON WEBTOKEN CREATED FOR USER LOGIN AND PERSISTENCE.

	const token = jwt.sign(
		{ id: newUser._id, username: newUser.username, permissions: "USER" },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRES }
	);

	res.status(201).json({
		status: "SUCCESS",
		data: {
			token,
			newUser,
		},
	});
});

//LOGIN!
const loginUsers = catchAsyncFunction(async (req, res, next) => {
	const { username, password, email } = req.body;

	//INPUT CONFIRMATION 1 )
	if ((!username && !email) || !password)
		return next(new AppError("ERROR: PLEASE FILL ALL FIELDS", 400));

	//SECURITY 1-A ) CHECKS FOR ACCOUNT MATCH IN DATABASE ------
	//NOTE: PASSWORD IS SET TO HIDDEN IN SCHEMA WHICH IS WHY THE ".select()" METHOD IS CALLED
	//NOTE: CHECKS FOR BOTH USERNAME AND EMAIL INPUT
	let user = await User.findOne({ username }).select("+password");
	if (!user) user = await User.findOne({ email }).select("+password");
	//SECURITY 1-B ) BCRYPT PASSWORD VALIDATION ------
	if (!user || (await user.correctPassword(password, user.password))) {
		//PERSISTANCE 1 ) JWT CREATION FOR PERSISTANCE ------

		const token = signToken(username);

		//PERSISTANCE 2 ) JWT TOKEN TO CLIENT ------

		return res.status(201).json({ status: "SUCCESS", data: { token } });
	} else {
		//SECURITY 1-C ) ERROR THROWN FOR INCORRECT PASSWORD
		return next(new AppError("ERROR: USER INFORMATION IS INVAID!!!", 401));
	}
});

const persistLogin = catchAsyncFunction(async (req, res) => {
	const { token } = req.body;
	const user = jwt.verify(token, JWT_SECRET);
	const { _id, username } = user;
	res.status(201).json({ status: "SUCCESS", username: username });
});

// UTILITY FUNCTIONS

const protect = catchAsyncFunction((req, res, next) => {
	let token;
	//SECURITY 1-A ) CHECKS THE HEADER OF THE BEARER OF THE TOKEN
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		//SECURITY 1-B ) SPLITS THE "BEARER" STRING FROM THE TOKEN IN THE HEADER AND ASSIGNS IT TO THE TOKEN VARIABLE
		token = req.headers.authorization.split(" ")[1];
	}
	if (!token) return next(new AppError("YOU ARE NOT LOGGED IN!", 401));
});

const signToken = (username) => {
	return jwt.sign({ username }, process.env.JWT_SECRET);
};

const models = { registerUsers, loginUsers, persistLogin, protect };

module.exports = models;
