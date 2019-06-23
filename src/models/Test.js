const mongoose = require('mongoose');

const subTestSchema = mongoose.Schema({
    id:{
        type:mongoose.Types.ObjectId
    },
    name:{
        type:String,
        required:true,
        maxlength:40
    }
},{timestamps:true});

const testSchema = mongoose.Schema({
    id:{
        type:mongoose.Types.ObjectId
    },
    name:{
        type:String,
        required:true,
        maxlength:40
    },
    subName:{
        type: mongoose.Types.ObjectId,
        ref:'SubTest'
    }
},{timestamps:true});

module.exports = Test = mongoose.model('Test',testSchema);
module.exports = SubTest = mongoose.model('SubTest',subTestSchema);