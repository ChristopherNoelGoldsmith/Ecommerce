const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		dateCreated: { type: String, default: new Date() },
		permissions: { type: String, default: "USER" },
		//admin: { type: Boolean, default: false },
	},
	{ collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
