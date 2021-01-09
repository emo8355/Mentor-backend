const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = () => {
	app.use(express.static(path.join(__dirname, "public")));
	app.use(compression());

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	app.use(cookieParser());
	app.use(helmet());

	// const db = process.env.MONGO_URI;
	const db = 'mongodb+srv://admin:dbpassword@nwhack.tpruh.mongodb.net/mentor?retryWrites=true&w=majority'
	mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log('MongoDB Database Connected')
        })
        .catch((err)=>{
            console.log(err)
        })

	app.get("/", (req, res) => {
		res.send("server up");
	});

	return app;
};
