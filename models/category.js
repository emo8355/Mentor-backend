<<<<<<< HEAD
const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		tags: {
			type: Array,
		},
		is_active: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{ timestamps: true }
);
=======
const mongoose = require('mongoose');
>>>>>>> 8693f2783b940bf94812cdf9412d7e1f32357dd2

module.exports = mongoose.model("Category", CategorySchema);
