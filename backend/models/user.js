const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		username: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true, trim: true },
		dateCreated: { type: String, default: new Date() },
		permissions: {
			type: String,
			default: "USER",
			enum: ["USER", "MODERATOR", "ADMIN"],
			hidden: true,
		},
	},
	{ collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
