// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // Ensure one cart per user
  },
  emailId:{
    type: String,
    required: true,
    unique: true
  },
  name:{
    type: String,
    required: true
  },
  number:{
    type: Number,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

cartSchema.pre('save', function(next) {
  // Calculate total price and quantity before saving
  this.totalPrice = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  this.totalQuantity = this.items.reduce((acc, item) => acc + item.quantity, 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
