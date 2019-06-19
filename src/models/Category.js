const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryID:{
        type: mongoose.Types.ObjectId,
    },
    categoryName:{
        type:String,
        required:true,
        maxlength: 60,
    }
    // childCategories:{
    //     type:mongoose.Types.Subdocument
    // }

});

module.exports = Category = mongoose.model('Category',categorySchema);