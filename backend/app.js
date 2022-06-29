//dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//imports SCHEMA
const { off } = require("process");
//Routers
const productsRouter = require("./routers/productRouter");
//Controllers
const userController = require("./controllers/userController");
//
const JWT_SECRET = "nfilidsndf)I(I5nb";
const URI_PASSWORD = "2KmSNnKXuHIipo54";
const URI = `mongodb+srv://Goldifysh:${URI_PASSWORD}@cluster0.wznu5v3.mongodb.net/allmightyccg?retryWrites=true&w=majority`;

//--------------------------------------
const app = express();

//used to connect mongoose to a db
mongoose.connect(URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
//MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
	next();
});
//

//routers users// needs to broken up and placed so it can be turned into a router.
app.post("/user/register", userController.registerUser);
app.post("/user/login", userController.loginUser);
app.post("/user/persist", userController.persistLogin);

app.use("/products", productsRouter);

module.exports = app;
