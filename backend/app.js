//dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
//imports
const User = require("./models/user");
const { off } = require("process");
//statics
const JWT_SECRET = "nfilidsndf)I(I5nb";
const URI_PASSWORD = "2KmSNnKXuHIipo54";
const PORT = 1337;
const URI = `mongodb+srv://Goldifysh:${URI_PASSWORD}@cluster0.wznu5v3.mongodb.net/allmightyccg?retryWrites=true&w=majority`;
const status = {
	success: "SUCCESS",
	fail: "FAIL",
	error: "ERROR",
};
//--------------------------------------
const app = express();

//used to connect mongoose to a db
mongoose.connect(URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

//user CRUD
//REGISTRATION!
app.post("/user/register", async (req, res) => {
	try {
		//Get Values from response and hash;
		const { username, password: plainTextPassword } = req.body;
		const password = await bcrypt.hash(plainTextPassword, 10);

		const response = User.create({
			username,
			password,
		});
		console.log(`USER: ${username} | CREATED!`);

		res.json({ status: status.success, data: username });
	} catch (error) {
		console.log(`AN ERROR HAS OCCOURED: ${error}`);
	}
});
//LOGIN! -----------------------
app.post("/user/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username }).lean();
		//ERROR HANDLING ------
		if (!user)
			res.json({ status: status.error, message: "INVALID USER INFORMATION!" });

		const token = jwt.sign(
			{ id: user._id, username: user.username },
			JWT_SECRET
		);

		//used to validate the hashed password via bcrypt
		if (await bcrypt.compare(password, user.password)) {
			console.log(`USER: ${username} | HAS LOGGED IN!`);
			res.json({ status: status.success, data: token });
		}

		return res.json({
			error: status.error,
			message: `INVALID USER INFORMATION!`,
		});
	} catch (error) {}
});

app.listen(PORT, () => console.log(`hello from the server on PORT:${PORT}`));
