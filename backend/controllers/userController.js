const express = require("express");
const bcrypt = require("bcryptjs");
const User = require(".././models/user");
const jwt = require("jsonwebtoken");
//status messages
const statusMessages = require("../status");
//
const app = express();
const { status } = statusMessages();
const JWT_SECRET = "nfilidsndf)I(I5nb";

//REGISTRATION!

const registerUser = async (req, res) => {
	console.log(res);
	try {
		const newId = req.body.username + 100;
		//Get Values from response and hash;
		const { username, password: plainTextPassword } = req.body;
		const password = await bcrypt.hash(plainTextPassword, 10);
		await User.create({
			id: newId,
			username,
			password,
		});
		console.log(`USER: ${username} | CREATED!`);

		res.json({ status: status.success, data: username });
	} catch (error) {
		console.log(`AN ERROR HAS OCCOURED: ${error}`);
	}
};

//LOGIN! -----------------------

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username }).lean();
		//ERROR HANDLING ------
		if (!user) {
			console.log("ERROR: user not found");
			res.json({ status: status.error, message: "INVALID USER INFORMATION!" });
		}
		const token = jwt.sign(
			{ id: user._id, username: user.username },
			JWT_SECRET
		);

		//used to validate the hashed password via bcrypt
		if (await bcrypt.compare(password, user.password)) {
			console.log(`USER: ${username} | HAS LOGGED IN!`);
			return res.json({ status: status.success, token: token });
		}
		console.log("what?");
		return res.json({
			error: status.error,
			message: `INVALID USER INFORMATION!`,
		});
	} catch (error) {}
};

const persistLogin = async (req, res) => {
	const { token } = req.body;
	try {
		const user = jwt.verify(token, JWT_SECRET);
		const { _id, username } = user;
		res.json({ status: status.success, username: username });
	} catch (error) {
		console.log(error);
	}
};

const model = { persistLogin, loginUser, registerUser };

module.exports = model;
