const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    positional:{
        type: String,
        required:true
    },
    salary:{
        type: Number,
        required:true
    },
    photo:{
        type: String,
        required:false
    },
    text:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required:true
    },
    userId:{
        type: String,
        required:false
    },
    categories:{
        type: String,
        required:false
    }
}, {timestamps: true})

module.exports = mongoose.model("Post", PostSchema)