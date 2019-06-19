const mongoose = require('mongoose');

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
    childCategory:[{
        category:{
            type:mongoose.Types.ObjectId,
            ref:'Category'
        }
    }]
},{timestamps:true});


categorySchema.pre('save',function(next){
    const cat = this;
    console.log(cat);
    next()
})

module.exports = Category = mongoose.model('Category',categorySchema);