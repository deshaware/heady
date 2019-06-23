const router = require('express').Router();
const Test = require('../models/Test')

router.post('/', async (req,res)=>{
    const name = req.body.name ? req.body.name.toUpperCase() : null;
    const subName = req.body.subName ? req.body.subName.toUpperCase() : null;
    if(name){
        //add new test
        console.log(name)
        console.log(subName)
        if(subName){
            const t = new Test({
                name,subName:[name]
            });
            t.save((err,rs)=>{
                if(err) console.log(err)
                console.log(rs)
            })
        } else {
            const t = new Test({
                name:name
            });   
            t.save((err,rs)=>{
                if(err) console.log(err)
                console.log(rs)
            })
        }        
    }
    res.status(200).send({"data":"hi"})
});

module.exports = router;