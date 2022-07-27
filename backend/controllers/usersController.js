const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const AppError = require("../utilities/appError");
const jwt = require("jsonwebtoken");
const sendEmail = require("./email");
const crypto = require("crypto");
const sign = require("../utilities/signToken");
const stripeController = require("./stripe");
//status messages and error handling
const catchAsyncFunction = require("../utilities/catchAsync");

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

	const token = sign.signToken(user._id);

	await user.save();

	sign.sendToken(token, 200, res);
});

//UPDATES THE USERS EMAIL OR USERNAME!
/*
NOTE: FUNCTION NEED TO BE UPDATED TO TAKE ANY PARAMS OTHER THAN PERMISSIONS OR PASSWORD!
*/

/*
/////////////////////
USER CART FUNCTIONS
/////////////////////
*/

//TODO: CREATE FUNCTION THAT ACCEPTS SINGLE VALUES AND ADDS THEM TO CART OR REMOVES THE FROM CART

// const removeCartItem = catchAsyncFunction(async (req, res, next) => {
// 	const { id } = req.body;

// 	// VALIDATION 1 ) CHECKS THE REQUEST FOR A PRODUCT
// 	if (!req.body.product)
// 		return new AppError("YOU MUST HAVE ITEMS TO REMOVE!", 400);

// 	const user = await User.findById(id);

// 	// VALIDATION 2 ) CHECKS USER'S CART FOR ITEMS
// 	if (user.cart.length < 1)
// 		return new AppError("THIS USER HAS AN EMPTY CART", 400);

// 	//ITEM REMOVAL 1 ) REMOVES ALL ITEMS WITH THE SELECTED ID FROM THE CART
// 	user.cart = user.cart.filter((item) => {
// 		if (item.id === product.id) return false;
// 		return true;
// 	});

// 	//ITEM REMOVAL 2 ) SAVES THE NEW UPADTED CART TO THE USER

// 	await user.save({ validateBeforeSave: false });

// 	res.status(200).json({ status: "SUCCESS", data: user.cart });
// });

const updateCart = catchAsyncFunction(async (req, res, next) => {
	const { cart } = req.body;
	const { id } = req.user;
	if (cart.length < 1) return new AppError("YOUR CART MUST HAVE ITEMS!", 400);
	//CART 1 ) ADDS THE CURRENT ITEMS IN THE CART TO THE CART PROPERTY ON THE USER
	const cartContents = cart.map((item) => {
		return { product: item.id, quantity: item.count * 1 };
	});
	const user = await User.findByIdAndUpdate(id, {
		cart: cartContents,
	}).populate("cart.product");
	if (!user) new AppError("UNABLE TO ADD ITEMS TO CART", 400);
	console.log("poop");

	const url = {
		success_url: `https://allmightyccg.netlify.app/cart/success`,
		cancel_url: `https://allmightyccg.netlify.app/`,
	};
	const checkoutSession = await stripeController.checkoutSession(
		user.cart,
		url
	);
	console.log(checkoutSession, "faggot");
	res.status(200).json({ status: "SUCCESS", data: checkoutSession });
});

const clearCart = catchAsyncFunction(async (req, res, next) => {
	const { id } = req.user;

	//IDENTIFY 1 ) IDENTIFIES USER IN DATABASE
	const user = await User.findById(id);
	//CLEAR CART 1 ) SETS CART TO EMPTY ARRAY WITH .save METHOD
	//TODO create dummy object to handle blank cart;
	user.cart = [];
	await user.save({ validateBeforeSave: false });

	res.status(200).json({ status: "SUCCESS", data: user });
});

//////////////////////////////////////////////////////////////////

const updateMe = catchAsyncFunction(async (req, res, next) => {
	const { id, username, email } = req.body;
	if (!username && !email)
		return next(new AppError("YOU MUST PROVIDE A USERNAME OR EMAIL"));
	if (!email) {
		await User.findOneAndUpdate(id, { username });
		return res
			.status(200)
			.json({ status: "SUCCESS", message: "USERNAME HAS BEEN UPDATED" });
	}
	// UPDATE USERNAME
	if (!username) {
		await User.findOneAndUpdate(id, { email });
		return res
			.status(200)
			.json({ status: "SUCCESS", message: "EMAIL HAS BEEN UPDATED" });
	}
	//UPDATES BOTH USERNAME AND EMAIL
	await User.findOneAndUpdate(id, { username, email });
	return res.status(200).json({
		status: "SUCCESS",
		message: "EMAIL AND USERNAME HAVE BEEN UPDATED",
	});
});

const deleteMe = catchAsyncFunction(async (req, res, next) => {
	const { id } = req.user;
	console.log(req.user);
	if (!id) return next(new AppError("USER NOT FOUND!", 404));
	// VERIFICATION
	const user = await User.findOneAndUpdate(id, { active: false }).select(
		"+active"
	);

	res
		.status(204)
		.json({ status: "YOUR ACCOUNT HAS BEEN SET TO INNACTIVE", data: null });
});

const model = {
	getAllUsers,
	usersProfile,
	deleteUsers,
	lostPassword,
	resetPassword,
	updateCart,
	clearCart,
	updateMe,
	deleteMe,
};

module.exports = model;
