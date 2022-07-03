const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: `${__dirname}/config.env` });
const PORT = process.env.PORT || 1337;

process.on("uncaughtException", (err) => {
	console.log(err.name, err.message);
	console.log("UNHANDLED EXEPTION");

	process.exit(1);
});

const server = app.listen(PORT, () =>
	console.log(`hello from the server on PORT:${PORT}`)
);

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	console.log("UNHANDLED REJECTION");

	server.close(() => {
		process.exit(1);
	});
});
