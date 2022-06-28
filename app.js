const express = require("express")
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const {config} = require("dotenv");
const authRoute = require('./router/auth')
const userRoute = require('./router/users')
const postRoute = require('./router/posts')
const categoriesRoute = require('./router/categories')
const cookieParser = require("cookie-parser")
const multer = require("multer")
const path = require("path");
const {normalizeType} = require("express/lib/utils");

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/WebsiteImg", express.static(path.join(__dirname, "/WebsiteImg")));

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoriesRoute)

app.use(express.static(path.join(__dirname, "/client/build")))

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/build" , 'index.html'))
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log("Backend is running")
})
