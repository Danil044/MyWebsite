const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require("../models/userModels")
const bcrypt = require('bcrypt')

router.post("/register", async(req, res, next)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        })

        const user = await newUser.save()
        res.status(200).json(user)
    }catch (err){
        return next(err);
    }
})

router.post("/login", async (req, res, next) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        })
        !user && res.status(400).json("Wrong email")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("Wrong password")

        const {password, ...others} = user._doc
        return res.status(200).json(others)
    }catch (err){
        return next(err);
    }
})

module.exports = router