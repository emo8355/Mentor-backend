const express = require("express");
const workshopController = express.Router();

module.exports = () => {
	workshopController.get("/", (req, res) => {});

	return workshopController;
};
