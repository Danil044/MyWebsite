const router = require('express').Router()
const Category = require('../models/categoryModels')

router.post("/", async(req, res) => {
    const newCat = new Category(req.body)
    try{
        const saveCat = await newCat.save()
        res.status(200).json(saveCat)
    }catch (err){
        res.status(500).json(err)
    }
})

router.get("/", async (req, res) => {
    const newCat = new Category(req.body)
    try{
        const categ = await Category.find()
        res.status(200).json(categ)
    }catch (err){
        res.status(500).json(err)
    }
})


module.exports = router