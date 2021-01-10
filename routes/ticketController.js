const express = require("express");
const router = express.Router();

const ticket = require("../models/ticket");

module.exports = () => {
	router.get("/", (req, res) => {
		res.send("user route");
	});

	router.get("/all", (req, res) => {
		//get all business
		ticket.find().exec((err, docs) => {
			if (err) {
				return res.send(err);
			}
			//Successful, send info
			res.send(docs);
		});
	});

	return router;
};
