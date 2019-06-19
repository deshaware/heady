const router = require('express').Router();
const Category = require('../models/Category');
const validator = require('validator');


router.get('/',async (req,res)=>{
    res.send({"category":"Mobiles"});
});

router.post('/', (req,res)=>{
    const cat = new Category({
        categoryName:req.body.name
    });
    cat.save().then(r=>console.log(r)).catch(e=>console.log(e));
})

module.exports = router