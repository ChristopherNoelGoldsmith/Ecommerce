const express = require("express");
const categoriesController = require(".././controllers/categoriesController");
const router = express.Router();

router.route("/").post(categoriesController.createCategory);

module.exports = router;
