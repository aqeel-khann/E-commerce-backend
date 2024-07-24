const express = require("express");
const dbConnect = require("./config/dbConnect");
const { signup, login } = require("./controller/buyer");
const Authentication = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { sellerSignup, sellerLogin } = require("./controller/seller");
const upload = require("../backend/multer"); 
const { createProduct, edit } = require("./controller/product");


const app = express()


const Port = 8000;
 
//Middleware for sending data from postman
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Database Connection
dbConnect();

// buyer Registration
app.post("/signup-buyer",signup);
app.post("/login-buyer", login);

// buyer Registration
app.post("/signup-seller",sellerSignup);
app.post("/login-seller", sellerLogin);

//create Product
app.post("/upload", upload.single("image"), Authentication, createProduct);
//update
app.post("/update", Authentication,edit)

app.get("/",Authentication,(req,res)=>res.send("done"))

app.listen(Port,()=>console.log(`Server is listen on Port ${Port}`))