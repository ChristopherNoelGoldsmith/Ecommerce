const express = require("express");
const productsController = require(".././controllers/productsController");
const router = express.Router();

//MIDDLEWARE
router.param("credentials", (req, res, next, val) => {
	//example
	if ("credentials" === "ADMIN")
		//make into param middleware verifying the identity of user using jwt token upon each request
		//for post only
		next();
});

//routers products
//!!!ADD MIDDLEWARE TO THE POST BELOW
router
	.route("/crimson-rampage")
	.get(productsController.crimsonRampage, productsController.getProducts);

router
	.route("/")
	.post(productsController.createProducts)
	.get(productsController.getProducts)
	.patch(productsController.patchProducts)
	.delete(productsController.deleteProducts);
//
router.route("/:id").get(productsController.getProductById);

module.exports = router;
