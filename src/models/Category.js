const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    categoryID:{
        type: mongoose.Types.ObjectId,
    },
    categoryName:{
        type:String,
        required:true,
        maxlength: 60,
        uppercase:true
    }
},{timestamps:true})
const categorySchema = new mongoose.Schema({
    categoryID:{
        type: mongoose.Types.ObjectId,
    },
    categoryName:{
        type:String,
        required:true,
        maxlength: 60,
        unique:true,
        uppercase:true
    },
    subCategories:[subCategorySchema]
},{timestamps:true});


categorySchema.pre('save',function(next){
    const cat = this;
    console.log(cat);
    next()
})

module.exports = Category = mongoose.model('Category',categorySchema);
// module.exports = subCategorySchema;