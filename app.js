const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

module.exports = () => {
	const businessRouter = require("./routes/businessController")();
	const workshopRouter = require("./routes/workshopController")();
	app.use(express.static(path.join(__dirname, "public")));
	app.use(compression());

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	app.use(cookieParser());
	app.use(helmet());

	const db = process.env.MONGO_URI;

	mongoose
		.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.log("MongoDB Database Connected");
		})
		.catch((err) => {
			console.log(err);
		});

	app.get("/", (req, res) => {
		res.send("server up");
	});

	app.use("/business", businessRouter);

	return app;
};
