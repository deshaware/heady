
const mongoose = require('mongoose');
// const validator = require('validator');

const productSchema = new mongoose.Schema({
    productID:{
        type: mongoose.Types.ObjectId,
    },
    productName:{
        type:String,
        required:true,
        maxlength: 60,
    },
    parentProduct:{
        type:mongoose.Types.Subdocument
    }
    // category:{
    //     type: mongoose.Types.ObjectId,
    //     ref:'Category'
    // }
});

module.exports = Products = mongoose.model('Products',productSchema);