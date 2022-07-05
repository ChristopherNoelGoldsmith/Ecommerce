const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const AppError = require("../utilities/appError");
const jwt = require("jsonwebtoken");
const sendEmail = require("./email");
const crypto = require("crypto");
const signToken = require("../utilities/signToken");
//status messages and error handling
const catchAsyncFunction = require("../utilities/catchAsync");
const statusMessages = require("../status");

// 1 ) FOR GETTING ALL USERS INFORMATION FROM THE DATABASE
const getAllUsers = catchAsyncFunction(async (req, res, next) => {
	const users = await User.find();
});

const usersProfile = catchAsyncFunction(async (req, res, next) => {
	//SECURITY 1 ) VERIFIES THE TOKEN EXISTS
	if (!token) return new AppError("YOU ARE NOT LOGGED IN!", 401);
	const verified = jwt.verify(token, process.env.JWT_SECRET);

	//SECURITY 2-A ) CHECKS IF TOKEN IS VALID
	if (verified) {
		//SECURITY 2-B ) CHECKS IF USER STILL EXISTS
		const { _id } = verfied;
		const user = await User.find(_id);

		//SECURITY 2-C ) CHECKS IF THE USER'S PASSWORD IS THE SAME AS WHEN TOKEN WAS ISSUED
		if (password) {
			return next();
		}
	}
	//IF NOT VERIFIED OR IF USER DOES NOT EXISTS I THIS ERROR IS THROWN
	return new AppError("YOU ARE NOT LOGGED IN!", 401);
});

const patchUsers = catchAsyncFunction(async (req, res, next) => {
	const { id, update } = req.params;

	// VALIDATION 1 ) CHECKS THE URL FOR THE ID
	if (!id) return next(new AppError("INVALID ID!", 401));
	if (!update) return next(new AppError("INVALID UPDATE INFORMATION!", 401));
	//VALIDATION 2 ) ENSURE THE USER EXISTS ON THE SERVER
	const user = await User.findByIdAndUpdate(id, update);
	if (!user) return next(new AppError("USER NOT FOUND!", 404));
	return res
		.status(200)
		.json({ status: "SUCCESS", message: "USER WAS UPDATED" });
});

const deleteUsers = catchAsyncFunction(async (req, res, next) => {
	const { id } = req.params;
	// VALIDATION 1 ) CHECKS THE URL FOR THE ID
	if (!id) return next(new AppError("INVALID ID!", 401));

	// VALIDATION 2 ) ENSURES THE USER EXISTS ON THE SERVER
	const user = await User.deleteOne({ id });
	if (!user) return next(new AppError("USER NOT FOUND!", 404));
	return res
		.status(200)
		.json({ status: "SUCCESS", message: "USER WAS DELETED" });
});

const lostPassword = catchAsyncFunction(async (req, res, next) => {
	const { email } = req.body;

	// VALIDATION 1) GET USER BASED ON EMAIL
	const user = await User.findOne({ email });
	if (!user) return next(new AppError("USER NOT FOUND!", 404));

	// SECURITY 1) GENERATE JWT
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	try {
		// VALIDATION 2) RETURN TOKEN VIA EMAIL
		//NOTE: TEMPLATE STRING TO FORGE AN HTTP REQUEST FOR THE USER
		const restURL = `${req.protocol}://${req.get(
			"host"
		)}/api/v1/users/reset-password/${resetToken}`;

		//NOTE: OPTIONS PASSED THROUGH TO GENERTATE THE EMAIL

		const emailOptions = {
			email,
			subject: `ALLMIGHTYCCG PASSWORD RESET!`,
			message: `Here is your password reset code ${restURL}`,
		};

		await sendEmail(emailOptions);

		res.status(200).json({
			status: "SUCCESS",
			message: "PASSWORD RESET HAS BEEN SENT!",
			token: resetToken,
		});
		//DELETE TOKEN IN RES ON DEPLYs
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		user.save({ validateBeforeSave: false });
		return next(
			new AppError("THERE WAS AN ERROR WITH THE EMAIL, TRY AGAIN!", 500)
		);
	}
});

const resetPassword = catchAsyncFunction(async (req, res, next) => {
	const { token: resetToken } = req.params;
	/* VALIDATION & SECURITY 1) HASHES TOKEN IN SAME WAY AS USER SCHEMA AND COMPARES IT TO THE TOKEN GIVEN TO THE USER
	
	NOTE: Current time is passed with $gt to see if the token is expired.  The token is given a time
	10 mins greater than the time it was generated so if the findOne does not pick it up, the token has expired.
	
	NOTE!!!: hashedToken need to be made into a dedicated function. has been used more then once.
	 
	 */
	const hashedToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	const currentTime = Date.now();
	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: currentTime },
	});
	if (!user) {
		return next(new AppError("YOUR TOKEN HAS EXPIRED PLEASE TRY AGAIN!", 400));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;

	const token = signToken(user._id);

	await user.save();

	res.status(200).json({ STATUS: "SUCCESS", token });
});

const model = {
	getAllUsers,
	usersProfile,
	deleteUsers,
	lostPassword,
	resetPassword,
};

module.exports = model;
