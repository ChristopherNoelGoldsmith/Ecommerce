//Dependancies
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
//Imports
const signToken = require("../utilities/signToken");
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

// SECURITY FUNCTIONS
//MIDDLEWARE TO CHECK IF USER IS LOGGED IN UPON ENTERING A NEW ROUTE
const protect = catchAsyncFunction(async (req, res, next) => {
	let token;
	//SECURITY 1-A ) CHECKS THE HEADER OF THE BEARER OF THE TOKEN
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		//SECURITY 1-B ) SPLITS THE "BEARER" STRING FROM THE TOKEN IN THE HEADER AND ASSIGNS IT TO THE TOKEN VARIABLE
		token = req.headers.authorization.split(" ")[1];
	}
	//SECURITY 1-C ) CHECKS FOR THE TOKEN
	if (!token) return next(new AppError("YOU ARE NOT LOGGED IN!", 401));

	//SECURITY 2 ) VERIFIES IF THE TOKEN IS VALID
	//NOTE: Promisify node utility used to prevent a clog in the event loop
	const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	//SECURITY 3 ) CHECKS IF USER STILL EXISTS
	const { id } = verified;
	const user = await User.findById(id);
	if (!user) return next(new AppError("THIS USER DOES NOT EXIST!", 401));

	//SECURITY 4 ) CHECKS IF USER'S PASSWORD HAS BEEN CHANGED SINCE THE TOKEN WAS ISSUED
	// NOTE: If the below schema method returns true an error is thrown
	const checkIfPasswordChanged = await user.changedPasswordAfter(verified.iat);
	if (checkIfPasswordChanged) {
		return next(
			new AppError("YOUR PASSWORD HAS CHANGED, PLEASE LOG BACK IN!", 401)
		);
	}

	//ALL SAFETY CHECKS COMPLETED AT THIS POINT!
	req.user = user;
	next();
});

//CHECKS USER CREDENTIALS WHEN ACCESSING A RESTRICTED API REQUEST
//NOTE: CREDENTIALS INCLUDE: USER, MODERATOR, ADMIN.

const restrict = (...permissions) => {
	return catchAsyncFunction(async (req, res, next) => {
		console.log("sex");
		console.log(req.user.permissions);
		if (!permissions.includes(req.user.permissions)) {
			return next(new AppError("NO PERMISSION!", 403));
		}
		next();
	});
};

const models = { registerUsers, loginUsers, persistLogin, protect, restrict };

module.exports = models;
