module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "ERROR!";

	res.json({ status: err.statusCode, message: err.message });
};
