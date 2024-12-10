const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
  productId:{
    type: Number,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '', 
  },
  categoryId: 
  { type: String,
     required: true 
  },
  category: 
  { type: String,
 required: true 
    },
createdAt: {
    type: Date,
    default: Date.now,      
}
},{ timestamps: true });


productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

module.exports = mongoose.model('Product', productSchema);


