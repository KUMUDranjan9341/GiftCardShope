const mongoose = require('mongoose');
const moment = require('moment-timezone');

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
    },
    otp: {
        type: Number,
        required: true,
    },
    date: {
        type: String, 
        default: () => moment.tz("Asia/Kolkata").format('YYYY-MM-DD'), 
    },
    time: {
        type: String, 
        default: () => moment.tz("Asia/Kolkata").format('HH:mm:ss'), 
    },
    createdAt: {
        type: Date,
        default: Date.now,  
        expires: 600      
    }
}, { timestamps: true });

module.exports = mongoose.model('otp', newSchema);
