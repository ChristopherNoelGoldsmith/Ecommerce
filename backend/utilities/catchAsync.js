const catchAsyncFunction = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

const model = catchAsyncFunction;

module.exports = model;
