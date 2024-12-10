const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
    },
    number: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user'
    },
    dob: { type: String, 
        required: false
     }, 
    gender: { type: String,
         required: false
         },  
})

module.exports = mongoose.model('useraccounts', UserSchema);


