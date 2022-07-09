const express = require("express");
const productsController = require(".././controllers/productsController");
const router = express.Router();

//routers products
//TODO: ADD MIDDLEWARE TO THE POST BELOW
router
	.route("/category/:extension")
	.get(productsController.categorySelect, productsController.getProducts);

//AGGREGATION ROUTES )
router.route("/get-avg-price").get(productsController.getPriceAverage);

//!development routes
router.route("/dev/populate-products").post(productsController.massPopulateDev);
router.route("/dev/patch-products").patch(productsController.setExtensionsDev);
//!------------------
/*
////////////////
--PRODUCT CRUD--
////////////////
*/
router
	.route("/")
	.post(productsController.createProducts)
	.get(productsController.getProducts)
	.patch(productsController.patchProducts)
	.delete(productsController.deleteProducts);
////////////////////////
//GET INDIVIDUAL PRODUCT
router.route("/:id").get(productsController.getProductById);
////////////////////////
module.exports = router;
