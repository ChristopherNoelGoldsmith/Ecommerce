const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A product must have a name."],
			unique: true,
			maxlength: [
				50,
				"The maximum length cannot be greater than 50 characters",
			],
			minlength: [1, "A name must have characters"],
			trim: true,
		},
		text: {
			type: String,
			required: [true, "A product must have a description."],
			trim: true,
		},
		count: {
			type: Number,
			default: 0,
		},
		img: { type: String },
		extension: { type: String, default: "none" },
		price: {
			type: Number,
			default: 10.0,
		},
		purchaseCount: { type: Number, default: 0 },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		collection: "products",
	}
);

const model = mongoose.model("ProductSchema", ProductSchema);

module.exports = model;
