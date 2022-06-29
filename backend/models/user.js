const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		//admin: { type: Boolean, default: false },
	},
	{ collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
