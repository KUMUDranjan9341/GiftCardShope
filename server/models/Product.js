const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        unique: true,
    },
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    categoryId: {
        type: String,
        required: true,
        unique: false
    },
    categoryName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    productImages: {
        type: [String], 
        default: []
    }
}, { timestamps: true });

productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

module.exports = mongoose.model("Product", productSchema);
