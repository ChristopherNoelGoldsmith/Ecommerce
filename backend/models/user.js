const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "You must have a username"],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "You must have a password"],
			trim: true,
			minlength: 5,
		},
		passwordConfirm: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				validator: function (pwConfirm) {
					if (pwConfirm === this.password) return true;
					return false;
				},
				message: "Password must match!",
			},
		},

		email: {
			type: String,
			required: [true, "You must have an email"],
			unique: true,
			lowerCase: true,
			trim: true,
			validate: [validator.isEmail, "A valid email is required"],
		},
		image: { type: String },
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

/*
--MIDDLEWARE--

1 ) Password Encryption

*/

// Security 1 ) PASSWORD ENCRYPTION!
UserSchema.pre("save", async function (next) {
	// A ) The below if statement prevents this middleware from running if the user password was not modified
	if (!this.isModified("password")) return next();

	// B ) PASSWORD HASHING
	this.password = await bcrypt.hash(this.password, 10);

	// C ) removes passwordConfirm from the final object provided by the UserSchema
	this.passwordConfirm = undefined;

	next();
});

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
