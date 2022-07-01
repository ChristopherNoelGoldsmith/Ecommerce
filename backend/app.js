// --Dependencies--
const status = require("./status");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
// 1 ) --IMPORTS--
const productsRouter = require("./routers/productRouter");
const usersRouter = require("./routers/usersRouter");
const AppError = require("./utilities/appError");
const errorHandler = require("./controllers/errorController");
// 2 ) --ENV VARIABLES--
const JWT_SECRET = process.env.JWT_SECRET;
const URI = process.env.DATABASE.replace(
	"%URI_PASSWORD%",
	process.env.PASSWORD
);
// --express app initiation--
const app = express();
// --Used to connect mongoose to the NoSQL database--
mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => console.log(`CONNECTION SUCCESSFUL!`));

/*
-MIDDLEWARE

-MORGAN IS USED ONLY FOR Development
*/
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(morgan("dev"));

//routers users// needs to broken up and placed so it can be turned into a router.
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);

//FOR BAD URLS
app.all("*", (req, res, next) => {
	const err = new AppError(`Can't find ${req.originalUrl} on server!`, 404);
	next(err);
});

//ERROR HANDLING
app.use(errorHandler);
module.exports = app;
