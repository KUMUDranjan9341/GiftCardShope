const mongoose=require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema=new mongoose.Schema({
    categoryId:{
        type:Number,
        unique:true
    },
    category:{
        type:String,
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now,    
    }

}, { timestamps: true });

schema.plugin(AutoIncrement, { inc_field: 'categoryId' });

const userModel=mongoose.model('category',schema)
module.exports=userModel