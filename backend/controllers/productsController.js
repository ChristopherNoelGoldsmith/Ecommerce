const Product = require("../models/product");
const APIFeatures = require("../utilities/utilities");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config({ path: `${__dirname}../config.env` });

//status messages
const statusMessages = require("../status");
//
const JWT_SECRET = process.env.JWT_SECRET;
const { status } = statusMessages();

//Adding products to the store
const createProducts = async (req, res) => {
	console.log("hello");
	/* A post to create and add an item to the store  
	Extenstion refers to the category of the item
	*/
	try {
		await Product.create(req.body);
		res.json({ status: status.success, data: name });
		console.log(`A new item was created ${name}`);
	} catch (error) {}
};

/*GET PRODUCTS ALIAS */

const crimsonRampage = async (req, res, next) => {
	req.query.limit = 25;
	req.query.page = 1;
	req.query.fields = "name, price, extension, count, img, text";
	req.query.extension = "Crimson Rampage";
	next();
};

//PRIMARY GET FUNCTION FOR PRODUCTS!
const getProducts = async (req, res) => {
	try {
		const query = await new APIFeatures(Product, req.query)
			.filter()
			.sort()
			.fields()
			.pagenation();

		// 1 ) Query Execution
		const data = await query.query;
		// 2 ) Data Response
		return res.status(200).json({ status: status.success, data: data });
	} catch (err) {
		return console.log(err);
	}
};

const patchProducts = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({});
	} catch (err) {}
};

const deleteProducts = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json({
			status: status.success,
			data: null,
		});
	} catch (err) {
		console.log(`Product could not be deleted | ${err}`);
	}
};

const getProductById = async (req, res) => {
	try {
	} catch (error) {}
};

/*
---massPopulate is used to write DUMMY_DATA to the database for devopment
*/
const massPopulateDev = async (req, res) => {
	try {
		fs.readFile(
			`${__dirname}/../../frontend/src/assets/rampage.json`,
			(err, data) => {
				console.log(data);
				data = JSON.parse(data);
				data.forEach(async (product, index) => {
					const params = {
						name: product.name,
						img: product.ultra_url_path,
						text: product.text,
						count: product.count,
						extension: product.extension,
						price: product.price * 1,
					};
					await Product.create(params);
					return;
				});
				res.json({ success: "yay" });
			}
		);
	} catch (err) {
		console.log("poop");
	}
};

const getPriceAverage = async (req, res) => {
	try {
		const stats = await Product.aggregate([
			{
				$match: { price: { $gte: 1 } },
			},
			{
				$group: {
					_id: null,
					avgPrice: { $avg: "$price" },
					maxPrice: { $max: "$price" },
					minPrice: { $min: "$price" },
				},
			},
		]);
		res.status(200).json({ message: status.success, data: stats });
	} catch (error) {
		console.log(error);
	}
};

const model = {
	getProducts,
	createProducts,
	patchProducts,
	deleteProducts,
	getProductById,
	getPriceAverage,
	crimsonRampage,
	massPopulateDev,
};

module.exports = model;
