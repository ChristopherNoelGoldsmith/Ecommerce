const jwt = require("jsonwebtoken");

//UTILITY FUNCTIONS
const signToken = (username) => {
	//set to return user id;
	return jwt.sign({ username }, process.env.JWT_SECRET);
};

module.exports = signToken;
