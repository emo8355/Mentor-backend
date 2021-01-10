const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		price: {
            type: Number,
            required: true
        },
        businessID: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Businesses",
        },
		is_active: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Package", PackageSchema);