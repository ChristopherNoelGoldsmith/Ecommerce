const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		text: { type: String, required: true },
		count: { type: Number, default: 0 },
		img: { type: String },
		extension: { type: String, default: "none" },
	},
	{ collection: "products" }
);

const model = mongoose.model("ProductSchema", ProductSchema);

module.exports = model;
