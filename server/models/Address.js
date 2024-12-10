// models/User.js
const mongoose = require('mongoose');

// Address schema
const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  pinCode: { type: Number, required: true },
  address: { type: String, required: true }, // main address text
  locality: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, default: 'India' } // Default to India, if applicable
});

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  mobileNo: { type: Number, required: true },
  addresses: [addressSchema] // Array of addresses
});

module.exports = mongoose.model('Address', userSchema);
