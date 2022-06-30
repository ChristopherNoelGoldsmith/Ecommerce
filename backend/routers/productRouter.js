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
	.route("/")
	.post(productsController.massPopulate)
	.get(productsController.getProducts);
//

module.exports = router;
