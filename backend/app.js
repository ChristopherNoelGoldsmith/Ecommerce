//dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
//Routers
const productsRouter = require("./routers/productRouter");
const usersRouter = require("./routers/usersRouter");

//ENV VARIABLES
const JWT_SECRET = process.env.JWT_SECRET;
//const URI_PASSWORD = "2KmSNnKXuHIipo54";
const URI = process.env.DATABASE.replace(
	"%URI_PASSWORD%",
	process.env.PASSWORD
);
//--------------------------------------
const app = express();

//used to connect mongoose to a db
mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => console.log(`CONNECTION SUCCESSFUL!`));
//MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
	next();
});
//

//routers users// needs to broken up and placed so it can be turned into a router.
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);

module.exports = app;
