
const mongoose = require('mongoose');
// const validator = require('validator');
const category = require('./Category');

const productSchema = new mongoose.Schema({
    productID:{
        type: mongoose.Types.ObjectId,
    },
    productName:{
        type:String,
        required:true,
        maxlength: 60,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'Category'
    }
});

productSchema.pre('save',(next)=>{
    console.log("Pre saving product")
    next()
})

module.exports = Products = mongoose.model('Products',productSchema);