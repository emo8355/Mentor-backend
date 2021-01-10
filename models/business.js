const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone_number: {
			type: String,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [4, "Password must be 4 characters or more."],
		},
		description: {
			type: String,
		},
		address: {
			type: String,
        },
        rating : {
            type: Number
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Business", BusinessSchema);
