const jwt = require("jsonwebtoken");

//UTILITY FUNCTIONS
const signToken = (user) => {
	//set to return user id;
	return jwt.sign(
		{
			id: user._id,
			username: user.username,
			permissions: user.permissions || "USER",
		},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRES }
	);
};

const sendToken = (token, statusCode, req, res) => {
	//PERSISTANCE 1 ) COOKIE WITH EXPIRATION
	//NOTE: MATH IN EXPIRES SET TO CONVERT TIME INTO milliseconds
	//httpOnly: purpose to prevent cross site attacks

	const cookieConfig = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		secure: req.secure || req.header("x-forwarded-proto") === "https",
		httpOnly: true,
	};
	res.cookie("jwt", token, cookieConfig);

	res.status(statusCode).json({ status: "SUCCESS", token });
};

const model = { signToken, sendToken };

module.exports = model;
