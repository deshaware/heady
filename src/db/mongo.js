const mongoose = require('mongoose');
const uri = require('../config/keys');

mongoose.connect(uri,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then((s)=>{
    console.log("Connected to the database")
}).catch(e=>console.log(`Error while connecting to db ${e}`));

const catChildSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId()
    },
    name:{
        type:String
    }
});

const catSchema = new mongoose.Schema({
    name:{
        type:String
    },
    children:[catChildSchema]
});

const category = mongoose.model('category',catSchema);
const cat = new category({name:"Books",children:[{name:"Audio"}]})

cat.save().then(r=>console.log(r)).catch(e=>console.log(e))


