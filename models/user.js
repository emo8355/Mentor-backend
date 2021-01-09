import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    role:{
        type: String,
        maxlength: [300, 'Max character count is 300 letters.']
    }
    
}, {timestamps : true})