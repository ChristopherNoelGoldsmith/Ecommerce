// --Dependencies--
const status = require("./status");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
dotenv.config({ path: `${__dirname}/config.env` });
// 1 ) --IMPORTS--
const productsRouter = require("./routers/productRouter");
const usersRouter = require("./routers/usersRouter");
const categoriesRouter = require("./routers/categoriesRouter");
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
/////////////////
///MIDDLEWARE///
/////////////////
*/

const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000, //milliseconds for 1 hour
	message: "YOU HAVE REACHED YOUR REQUEST LIMIT, PLEASE TRY AGAIN LATER!",
});
// SECURITY 1) HELMET
app.use(helmet());

// SERVING STATIC FILES//
app.use("/", express.static(path.join(__dirname, "static")));

// TOOLS 1 )
app.use(bodyParser.json());

/*
SECURITY 2 )
///////////////////////////
--DATA SANITIZATION BELOW--
///////////////////////////
*/
//USE TO KEEP $gte, ect query injection exploits from working//
app.use(mongoSanitize());

//XSS PROTECTION
app.use(xss());

//PERAMITER POLLUTION //
//!NOTE: POSSIABLE SOURCE OF BUGS WITH QUERIES IF NOT WHITELISTED PROPERLY
app.use(
	hpp({
		whitelist: ["price"],
	})
);

// DOS PROTECTION VIA LIMIT BELOW //
app.use("/api", limiter);
app.use(express({ limit: "10kb" }));

//Dev
app.use(morgan("dev"));
// MIDDLEWARE END //

/*
//--------------------//
--------ROUTERS------
//--------------------//
*/
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/users", usersRouter);
//! app.use("/api/v1/products", productsRouter);

//FOR BAD URLS
app.all("*", (req, res, next) => {
	const err = new AppError(`Can't find ${req.originalUrl} on server!`, 404);
	next(err);
});

//ERROR HANDLING
app.use(errorHandler);
module.exports = app;
