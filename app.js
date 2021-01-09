const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const app = express();

module.exports = () => {
	app.use(express.static(path.join(__dirname, "public")));
	app.use(compression());

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	app.use(cookieParser());
	app.use(helmet());

	app.get("/", (req, res) => {
		res.send("server up");
	});

	return app;
};
