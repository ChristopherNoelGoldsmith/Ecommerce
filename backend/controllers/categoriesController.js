const APIFeatures = require("../utilities/utilities");
const mongoose = require("mongoose");
const Categories = require("../models/categories");
const catchAsyncFunction = require("../utilities/catchAsync");

//! POSSIABLE DEPRECIATION!
//CATEGORY CREATION WITHOUT PRODUCTS
const createCategory = catchAsyncFunction(async (req, res, next) => {
	//TODO ADD FLUSH OUT THE CATEGORY SCHEMA MORE
	const { name } = req.body;

	const category = await Categories.create({ name });
	console.log(category);
	res.status(200).json({ status: "SUCCESS", data: category });
});

const addProductToCategory = catchAsyncFunction(async (req, res, next) => {});
const model = { createCategory };

module.exports = model;
