const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const bodyParser = require('body-parser');
require('./db/mongo');

const category = require('./routes/category')
const product = require('./routes/product')
const test = require('./routes/test')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use('/api/category',category)
app.use('/api/product',product)
app.use('/api/test',test)

const port = process.env.port || 3000;

app.get('/',(req,res)=>{
    res.status(302).send({"data":"Hello world"})
})

app.listen(port,(err)=>{if(err)return console.log(err);console.log(`Listening ${port}`)});

