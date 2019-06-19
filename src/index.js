const express = require('express')
const app = express();
const bodyParser = require('body-parser');
require('./db/mongo');

const category = require('./routes/category')
const product = require('./routes/product')

app.use('/api/category',category)
app.use('/api/product',product)
const port = process.env.port || 3000;
app.get('/',(req,res)=>{
    res.status(302).send({"data":"Hello world"})
})

app.listen(port,(err)=>{if(err)return console.log(err);console.log(`Listening ${port}`)});

