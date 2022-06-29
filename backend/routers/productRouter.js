const express = require("express");
const productController = require(".././controllers/productController");
const router = express.Router();

//MIDDLEWARE
router.param("id", (req, res, next, val) => {
	next();
});

//routers products
router
	.route("/")
	.post(productController.createProducts)
	.get(productController.getProducts);
//

module.exports = router;
