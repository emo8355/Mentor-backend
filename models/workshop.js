<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose');
>>>>>>> 8693f2783b940bf94812cdf9412d7e1f32357dd2

const WorkshopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mentor_name: {
			type: String,
			required: true,
		},
		start_time: {
			type: Date,
			required: true,
		},
		end_time: {
			type: Date,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
		},
		is_active: {
			type: Boolean,
			required: true,
			default: true,
		},
		categoryID: {
			// required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		businessID: {
			// required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
		},
		max_attendance: {
			type: Number,
			required: true,
		},
		curr_attendance: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Workshop", WorkshopSchema);
