const express = require("express");
const productsController = require(".././controllers/productsController");
const router = express.Router();
const stripeController = require("../controllers/stripe");

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
router.route("/dev/add-to-stripe").post(stripeController.devCreateItems);
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
	.delete(productsController.deleteProducts);
////////////////////////
//GET INDIVIDUAL PRODUCT
//router.route("/:id").get(productsController.getProductById);
router
	.route("/:id")
	.patch(
		productsController.uploadProductPhoto,
		productsController.resizePhoto,
		productsController.patchProducts
	);

////////////////////////
module.exports = router;
