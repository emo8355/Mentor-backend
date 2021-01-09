import * as mongoose from 'mongoose'

export const WorkshopSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
    },
    mentor_name: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required : true,
    },
    end_time:{
        type: Date,
        required: true,
    },
    location :{
        type: String,
        required: true,
    },
    price :{
        type: Number,
    },
    is_active:{
        type: Boolean,
        required: true,
        default: true,
    },
    categoryID : {
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    businessID : {
        // required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref : "Business"
    },
    max_attendance: {
        type: Number,
        required: true
    },
    curr_attendance : {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps : true})