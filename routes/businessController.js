const express = require("express");
const router = express.Router();

const business = require("../models/business");

const AWS = require("../middleware/imageUpload");

module.exports = () => {
	router
		.route("/")
		.get((req, res) => {
			res.send("Business Route");
		})
		.post(AWS.upload.single("pic"), (req, res) => {
			const infoBody = { ...req.body };
			const file = req.file;
			let img_url = `https://d39wlfkh0mxxlz.cloudfront.net/${file.originalname}`;
			console.log(img_url);
			console.log(infoBody);
			res.send("ojbk");
		});

	return router;
};
