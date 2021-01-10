const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		workshopID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Workshop",
		},

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
			default: "(000) - 000 0000",
		},

		numberOfPeople: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
