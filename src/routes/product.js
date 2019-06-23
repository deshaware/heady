
const router = require('express').Router();
const Product = require('../models/Product');
const _ = require('lodash');

router.get('/', async(req,res)=>{
    try {
        const result = await Product.find({})   
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/', async (req,res) =>{
    console.log(req.body.category)
    try {
        const productName = req.body.productName ? req.body.productName.toUpperCase() : null;
        const price = req.body.price ? req.body.price : null;
        const category = req.body.category ? req.body.category.toUpperCase() : null;
        console.log(price)
        if(productName && price && category) {
            //get category
            console.log(productName)
            const cat = await Category.find({
                "subCategories.categoryName":category
            });
            console.log(cat)
            if(!_.isEmpty(cat)){
                const catID = cat.subCategories.filter(r=>r.categoryName===category)._id;
                console.log(catID)
                const res = new Product({
                    productName:productName,
                    price:price,
                    category:catID
                });
                const d = await res.save();
                console.log(d)
                res.status(201).send(d)
            } else {
                res.status(400).json({"error":"Please add newe category"})
            }
        } else {
            res.status(400).send({"error":"Please provide productName, price and category of the product"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;