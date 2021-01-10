const express = require("express");
const router = express.Router();

const business = require("../models/business");

const AWS = require("../middleware/imageUpload");
const Mongoose = require("mongoose");

module.exports = () => {
	router.get("/", (req, res) => {
		res.send("business route");
	});

	router.get("/all", (req, res) => {
		//get all business
		business.find().exec((err, listOfBusiness) => {
			if (err) {
				return res.send(err);
			}
			//Successful, send info
			res.send(listOfBusiness);
		});
	});

	router.get("/signin", (req, res) => {
		const { email, password } = req.body;
		//get all business
		business.findOne({ email: email }).exec((err, doc) => {
			if (err) {
				return res.send(err);
			}
			//Successful, send info
			if (doc.password == password) {
				res.send(doc);
			}
		});
	});

	router.post("/signup", AWS.upload.single("pic"), (req, res) => {
		const infoBody = { ...req.body };
		const file = req.file;
		let imgURL = `https://d39wlfkh0mxxlz.cloudfront.net/${file.originalname}`;
		if (infoBody.confirmPassword == infoBody.password) {
			const newBusiness = new business({
				name: infoBody.name,
				email: infoBody.email,
				phone_number: infoBody.phone_number,
				username: infoBody.username,
				password: infoBody.password,
				description: infoBody.description,
				address: infoBody.address,
				img_url: imgURL,
			});
			newBusiness.save((err) => {
				if (err) {
					return res.send("something went wrong, please try again later");
				}
			});
			return res.send("Business account created");
		} else {
			res.send("Password does not match");
		}
	});

	router.get("/:id", (req, res) => {
		business.findOne(
			{ _id: Mongoose.Types.ObjectId(req.params.id) },
			(err, doc) => {
				if (err) {
					return res.send(err);
				}
				return res.send(doc);
			}
		);
	});

	router.post("/:id/delete", (req, res) => {
		business.deleteOne(
			{ _id: Mongoose.Types.ObjectId(req.params.id) },
			(err) => {
				if (err) {
					return res.send(err);
				}
				return res.send(true);
			}
		);
	});

	router.post("/:id/update", (req, res) => {});

	return router;
};
