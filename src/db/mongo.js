const mongoose = require('mongoose');
const uri = require('../config/keys');

mongoose.connect(uri,{
    useNewUrlParser:true
},(err)=>{
    if(err)
    console.log(`Unable to connect to mongodb`);
}).then((s)=>{
    console.log("Connected to the database")
}).catch(e=>console.log(`Error while connecting to db ${e}`));


