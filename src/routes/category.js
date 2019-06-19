const router = require('express').Router();
const Category = require('../models/Category');
const validator = require('validator');

router.get('/',async (req,res)=>{
    const data = await Category.find();
    res.status(200).send(data);
});

router.post('/', (req,res)=>{
    console.log(req.body.name)
    if(!req.body.name)
        res.status(400).send({"error":"Please provide category name"})
    const cat = new Category({
        categoryName:req.body.name
    });
    cat.save().then(r=>res.status(201).send(r)).catch(e=>res.status(400).send(e));  
})

module.exports = router;