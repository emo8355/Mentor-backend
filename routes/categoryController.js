const express = require("express");
const categoryController = express.Router();
const Category = require("../models/category");

module.exports = () => {
	categoryController.get('/all', (req,res)=> {
		Category.find((err, data)=> {
			if (err)
				res.send(err);
			res.send(data);
		})
	})

	categoryController.get('/search-name/:name', (req,res)=> {
		Category.find({name: req.params.name},(err, data)=> {
			if (err)
				res.send(err);
			res.send(data);
		})
	})

	categoryController.get('/search-tags/:tag', (req,res)=> {
		Category.find({tags : {$in : [req.params.tag]}}, (err, data)=> {
			if (err)
				res.send(err);
			res.send(data);
		})
	})


	return categoryController;
};
