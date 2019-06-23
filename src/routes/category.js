const mongoose = require('mongoose');
const router = require('express').Router();
const Category = require('../models/Category');
// const subCategorySchema = require('../models/Category')
const validator = require('validator');

//just for testing until I remove module.exports issue
const subCategorySchema = new mongoose.Schema({
    categoryID:{
        type: mongoose.Types.ObjectId,
    },
    categoryName:{
        type:String,
        required:true,
        maxlength: 60,
        uppercase:true
    }
});

router.get('/',async (req,res)=>{
    const data = await Category.find();
    res.status(200).send(data);
});

router.post('/', async (req,res)=>{
    const category = req.body.category.toUpperCase();
    const subCategory = req.body.subCategory ? req.body.subCategory.toUpperCase(): null;
    console.log(category)
    if(!category)
        res.status(400).send({"error":"Please provide category name"})
    try {
            //check if already exist, both in name and in subname
    const cat = await Category.findOne({"categoryName":category})
    if(!cat){
        //category does not exist
        const newCat = await new Category({"categoryName":category});
        const newCatResult = await newCat.save()
        console.log("saved newCat")
        if(subCategory){
            //if subcategory is not null, means we need to add that
            const subCat = await new Category({"categoryName":subCategory});
            // console.log(`Now we will update cat`)
            // const result = await Category.findOneAndUpdate({"categoryName":category},{$push:{
            //     "subCategories.$":subCat
            // }})
            await newCat.subCategories.push(subCat)
            await newCat.save((err,cb)=>{
                if(err) res.status(400).json(err)
                res.status(201).json(subCat)
            });
            
        } else {
            res.status(201).json(newCatResult);
        }
    } else { 
        //category exists        
        if(subCategory){// subCategory Given
            Category.findOne({categoryName:category}).then(r=>{
                console.log(r)
                const exist = r.subCategories.filter(s=>s.categoryName === subCategory)
                if(exist.length!==0){
                    //no need to add
                    res.status(400).send({"error":`Subcateogry ${subCategory } already exist in ${category}`})
                } else {
                    const subCat = new Category({"categoryName":subCategory});
                    r.subCategories.push(subCat);
                    r.save((err,d)=>{
                        if(err) res.status(400).json({"error":err});
                        res.status(201).json(subCat)
                    });                    
                    console.log(last);
                }
            });
            // console.log(_sub)
            // res.status(200).send(_sub)
            // //if not exist then add here
            // const subCat = await new Category({"categoryName":subCategory});
            // Category.updateOne({"categoryName":category},{
            //     $push:{
            //         subCategories:subCat
            //     }
            // },(err,data)=>{
            //     console.log(err)
            //     console.log(data)
            // })
        } else {
            res.status(200).json({"data":"category already exist"});
        }
    }
    } catch (error) {
        console.log(`Error ${error}`);
    }
});

module.exports = router;