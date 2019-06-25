
const router = require('express').Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const _ = require('lodash');

router.get('/', async(req,res)=>{
    try {
        const result = await Product.find({})   
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

//@route "/"
//@desc To update the price of the product
router.post('/price', async (req,res) =>{
    try {
        const productName = req.body.productName ? req.body.productName.toUpperCase() : null;
        const price = req.body.price ? req.body.price : null;
        //check if the product exist
        const product = await Product.findOneAndUpdate({
            productName:productName
        },{
            $set:{
                price:price
            }
        });
        if(!product) res.status(404).json({"error":"Product Does not exist"})
        res.status(200).json(product);
    } catch (error) {
        
    }
});

//@route "/"
//@name  add product
//@desc  To add product
router.post('/', async (req,res) =>{
    console.log(req.body.category)
    try {
        const productName = req.body.productName ? req.body.productName.toUpperCase() : null;
        const price = req.body.price ? req.body.price : null;
        const category = req.body.category ? req.body.category.toUpperCase() : null;
        if(productName && price && category) {
            //find category
            let cat = await Category.findOne({categoryName:category});
            if(!cat){
                //check subCategory
                cat = await Category.findOne({
                    "subCategories.categoryName":category
                });
                cat = cat.subCategories[0];
                if(!cat){
                    //Category does not exist
                    res.send(400).json({"error":"Category does not exist, please create category first"})
                }
            }
            const res = new Product({
                productName:productName,
                price:price,
                category:cat._id
            });
            const d = await res.save();
            res.status(201).send(d)         
        } else {
            res.status(400).send({"error":"Please provide productName, price and category of the product"})
        }
    } catch (error) {
        res.status(400).json({"error":error})
    }
});

module.exports = router;