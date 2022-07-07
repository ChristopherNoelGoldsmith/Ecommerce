const mongoose = require("mongoose");
const Products = require("./product");

const CategoriesSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "YOUR CATEGORY MUST HAVE A NAME!"],
			unique: [true, "THIS CATEGORY ALREADY EXISTS!"],
		},
		// TODO INCLUDE THE PRODUCT AS THE REF FOR THE SCHEMA BELOW
		products: { type: mongoose.Schema.ObjectId, ref: "Products" },
		dateCreated: { type: Date, default: Date.now() },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		collection: "categories",
	}
);

// TODO ADD AGGREGATION TO GET HIGHEST PRICE LOWEST PRICE AND MEDIAN
//QUERY MIDDLEWARE
// ! UNTESTED
/*
CategoriesSchema.pre(/^find/, async function (next) {
	//  PURPOSE IS TO POPULATE THE PRODUCTS ON QUERY
	this.populate({
		category: "products",
		select: "-__v",
	});
	next();
});
*/
// ? LOOK INTO VIRTUAL POPULATION DOCUMENTATION -> https://mongoosejs.com/docs/tutorials/virtuals.html
// purpose is to connect the products with the categories
// ! UNTESTED
/*CategoriesSchema.virtual("products", {
	ref: "Product",
	foreignField: "_id",
	localField: "_id",
});*/

const model = mongoose.model("CategoriesSchema", CategoriesSchema);

module.exports = model;
