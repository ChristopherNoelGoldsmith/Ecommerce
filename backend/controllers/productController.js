const Product = require(".././models/product");
const bcrypt = require("bcryptjs");
//status messages
const statusMessages = require("../status");
//
const JWT_SECRET = "nfilidsndf)I(I5nb";
const { status } = statusMessages();

//Adding products to the store
const createProducts = async (req, res) => {
	/* A post to create and add an item to the store  
	Extenstion refers to the category of the item
	*/
	try {
		const { name, text, img, count, extension } = req.body;
		const id = name + "fart";
		await Product.create({
			id,
			name,
			text,
			img,
			count,
			extension,
		});
		res.json({ status: status.success, data: name });
		console.log(`A new item was created ${name}`);
	} catch (error) {}
};

const getProducts = async (req, res) => {
	try {
		res.status(200).json({});
	} catch (err) {}
};

const patchProducts = async (req, res) => {
	try {
		res.status(200).json({});
	} catch (err) {}
};

const deleteProducts = async (req, res) => {
	try {
		res.status(200).json({});
	} catch (err) {}
};

const model = { getProducts, createProducts, patchProducts, deleteProducts };

module.exports = model;
