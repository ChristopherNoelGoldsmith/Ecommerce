const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const fs = require("fs");
//status messages
const statusMessages = require("../status");
//
const JWT_SECRET = "nfilidsndf)I(I5nb";
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

const getProducts = async (req, res) => {
	try {
		const data = await Product.find();
		return res.status(200).json({ status: status.success, data });
	} catch (err) {
		return console.log(err);
	}
};

const patchProducts = async (req, res) => {
	try {
		Product.findByIdAndUpdate(req.body);
		res.status(200).json({});
	} catch (err) {}
};

const deleteProducts = async (req, res) => {
	try {
		Product.findByIdAndDelete(req.body);
		res.status(200).json({
			status: status.success,
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
const massPopulate = async (req, res) => {
	try {
		fs.readFile(
			`${__dirname}/../../frontend/src/assets/rampage.json`,
			(err, data) => {
				console.log(data);
				data = JSON.parse(data);
				data.forEach(async (product, index) => {
					const { extension } = product;
					const _id =
						`${extension[0]}${extension[1]}${extension[2]}${index}`.toLocaleLowerCase();
					const params = {
						name: product.name,
						img: product.ultra_url_path,
						text: product.text,
						count: product.count,
						extension: product.extension,
						price: product.price,
						_id: _id,
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
*/
const model = {
	getProducts,
	createProducts,
	patchProducts,
	deleteProducts,
};

module.exports = model;
