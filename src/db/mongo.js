const mongoose = require('mongoose');
const uri = require('../config/keys');
const Category = require('../models/Category');

mongoose.connect(uri,{
    useNewUrlParser:true,
    useCreateIndex:true,useFindAndModify:true
}).then((s)=>{
    console.log("Connected to the database")
}).catch(e=>console.log(`Error while connecting to db ${e}`));

//This worked
// Category.find({
//     "subCategories.categoryName":"MOBILE"
// }).then(r=>{
//     console.log(r[0].subCategories.filter(r=>r.categoryName==="BAG"))
// });