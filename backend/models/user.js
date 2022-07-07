const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Products = require("./product");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "You must have a username"],
			unique: true,
			trim: true,
			minlength: 5,
		},
		password: {
			type: String,
			required: [true, "You must have a password"],
			trim: true,
			minlength: 5,
			select: false,
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
		passwordChangedAt: { type: Date },
		cart: [{ type: mongoose.Schema.ObjectId, ref: "ProductSchema" }],
		email: {
			type: String,
			required: [true, "You must have an email"],
			unique: true,
			lowerCase: true,
			trim: true,
			validate: [validator.isEmail, "A valid email is required"],
		},
		passwordResetToken: { type: String },
		passwordResetExpires: { type: Date },
		image: { type: String },
		dateCreated: { type: String, default: new Date() },
		permissions: {
			type: String,
			default: "USER",
			enum: ["USER", "MODERATOR", "ADMIN"],
		},
		active: { type: Boolean, default: true, select: false },
	},
	{ collection: "users" }
);

/*
//////////////////
  --MIDDLEWARE----
//////////////////

*/
//1 ) Password Encryption

// SECURITY 1 ) PASSWORD ENCRYPTION!
UserSchema.pre("save", async function (next) {
	// A ) The below if statement prevents this middleware from running if the user password was not modified
	if (!this.isModified("password")) return next();

	// B ) PASSWORD HASHING
	this.password = await bcrypt.hash(this.password, 10);

	// C ) removes passwordConfirm from the final object provided by the UserSchema
	this.passwordConfirm = undefined;

	next();
});

// SECURITY 2 ) PASSWORD CONFIRMATION!
UserSchema.methods.correctPassword = async function (
	unhashedPassword,
	userPassword
) {
	return await bcrypt.compare(unhashedPassword, userPassword);
};

// SECUIRTY 3 ) CHECK FOR PASSWORD CHANGE
//NOTE: Takes the time of the password change and comapres it to the time of the JWT token.
//--If the token issue was before the password it returns true.
UserSchema.methods.changedPasswordAfter = async function (jwtTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return jwtTimestamp < changedTimeStamp;
	}

	return false;
};

// SECURITY 4 ) GENERATES PASSWORD RESET TOKEN TO RESET PASSWORD
UserSchema.methods.createPasswordResetToken = function () {
	//SECURITY A ) CREATES A CRYPTO TOKEN TO BE SENT TO THE USER TO VERIFY THEIR IDENTITY TO RESET PASSWORD
	const token = crypto.randomBytes(32).toString("hex");
	console.log(token);
	// RESET 1 ) HSASHES THE RESET TOKEN AND SETS IT TO THE USER
	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");

	//SECURITY B ) SETS AN EXPIRATION ON THE TOKEN GENERATED AT THE TOP OF THIS FUNCTION
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	//RETURNS THE TOKEN
	return token;
};

// SECURITY 5 )

UserSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	/* 
	NOTE: time -1000 added to resolve a but with jwt authentication
	lag on server causeing time token is generated to be after
	the creation of a document
	*/

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// UTILITY 1 ) PASSWORD UPDATING WHILE LOGGED IN!
// NOTE: THIS EXISTS AS A SHORTCUT TO USE SINCE .findOneAndPatch DOES NOT TRIGGER
//MIDDLEWAREABOVE FOR THE PASSWORD CHANGE.
UserSchema.methods.updatePassword = function (newPassword) {
	console.log(newPassword, 134);
	return (this.password = newPassword);
};

// UTILITY 2 ) ONLY TARGET ACTIVE USERS
UserSchema.pre(/find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
