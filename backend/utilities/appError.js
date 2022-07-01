class AppError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.message = message;
		this.statusCode = `${statusCode}`.startsWith(4) ? "FAIL" : "ERROR";
		this.isOperational = true;

		//Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;
