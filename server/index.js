const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const postsRoute = require("./routes/posts");

//App variables
const app = express();
app.use(cors({ origin: true, credentials: true }));
const port = "4001";
dotenv.config();
app.use("/images", express.static(path.join(__dirname, "/images")))

// Mongo DB
mongoose.connect(process.env.MONGO_URL)
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

// Storage
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images")
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File has been uploaded...")
})

// Routes
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/api/auth", authRoute); 
app.use("/api/users", usersRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/posts", postsRoute);

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});