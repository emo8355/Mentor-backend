const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
        },
        description: {
            type:String,
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
        img_url:{
            type: String,
        },
        required_package: {
            type: Boolean,
            required: true,
        },
        packageID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package"
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
        min_attendance:{
            type:Number,
            required: true,
        },
		curr_attendance: {
			type: Array,
			required: true,
			default: [],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Workshop", WorkshopSchema);
