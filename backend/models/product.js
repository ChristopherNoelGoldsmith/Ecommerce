const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "A product must have a name."],
			unique: true,
		},
		text: {
			type: String,
			required: [true, "A product must have a description."],
		},
		count: {
			type: Number,
			default: 0,
		},
		img: { type: String },
		extension: { type: String, default: "none" },
		price: {
			type: String,
			default: "10.00",
		},
		purshaseCount: { type: Number, default: 0 },
		_id: { type: String, required: [true, "An item must have an ID"] },
	},
	{ collection: "products" }
);

const model = mongoose.model("ProductSchema", ProductSchema);

module.exports = model;
