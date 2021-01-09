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

module.exports = mongoose.model("Category", CategorySchema);
