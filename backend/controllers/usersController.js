const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const AppError = require("../utilities/appError");
const jwt = require("jsonwebtoken");
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
		const user = User.find(_id);

		//SECURITY 2-C ) CHECKS IF THE USER'S PASSWORD IS THE SAME AS WHEN TOKEN WAS ISSUED
		if (password) {
			return next();
		}
	}
	//IF NOT VERIFIED OR IF USER DOES NOT EXISTS I THIS ERROR IS THROWN
	return new AppError("YOU ARE NOT LOGGED IN!", 401);
});

const model = { getAllUsers, usersProfile };

module.exports = model;
