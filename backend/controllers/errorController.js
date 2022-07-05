const AppError = require("../utilities/appError");

const handleJWTError = (err) => {
	return new AppError("Invalid token, please log in again", 401);
};
const handleExpiredTokenError = (err) => {
	return new AppError("Session has expired, please log in again!", 401);
};

const errDev = (res, err) => {
	if (err.isOperational) {
		return res.json({
			status: err.statusCode,
			message: err.message,
			error: err,
			stack: err.stack,
		});
	}
	console.error("ERROR", err);
	return res
		.status(500)
		.json({ status: "ERROR!", message: "SOMETHING WENT VERY WRONG!!!" });
};

const errProduction = (res, err) => {
	return res.json({ status: err.statusCode, message: err.message });
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "ERROR!";

	if (process.env.NODE_ENV === "development") {
		console.log("poop");
		return errDev(res, err);
	}
	if (error.name === "JsonWebTokenError") error = handleJWTError(error);
	if (error.name === "TokenExpiredError")
		error = handleExpiredTokenError(error);
	return errProduction(res, err);
};
