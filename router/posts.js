const router = require('express').Router()
const Post = require("../models/postModels")

router.post("/", async(req, res)=>{
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost)
    }catch (err){
        res.status(500).json(err)
    }
})

router.put("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        try{
            const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new: true})
            res.status(200).json(updatePost)
        }catch (err){
            res.status(500).json(err)
        }
    }catch (err){
        res.status(500).json(err)
    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        try{
            await post.delete()
            res.status(200).json("Post has been deleted...")
        }catch (err){
            res.status(500).json(err)
        }
    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/:userId', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) =>{
    const city = req.query.city
    const country = req.query.country
    const username =req.query.user
    const catName = req.query.cat
    try{
        let posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else if(country){
            posts = await Post.find({country})
        }else if(city){
            posts = await Post.find({city})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router