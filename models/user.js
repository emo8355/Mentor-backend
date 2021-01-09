<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose');
>>>>>>> 8693f2783b940bf94812cdf9412d7e1f32357dd2

export const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},

		role: {
			type: String,
			maxlength: [300, "Max character count is 300 letters."],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
