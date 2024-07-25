const express = require("express");
const dbConnect = require("./config/dbConnect");
const { signup, login } = require("./controller/buyer");
const Authentication = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { sellerSignup, sellerLogin } = require("./controller/seller");
const upload = require("../E-commerce-backend/multer");
const { createProduct, edit } = require("./controller/product");
var cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
const Port = 8000;

//Middleware for sending data from postman
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Database Connection
dbConnect();

// buyer Registration
app.post("/signup-buyer", signup);
app.post("/login-buyer", login);

// buyer Registration
app.post("/signup-seller", sellerSignup);
app.post("/login-seller", sellerLogin);

//create Product
app.post("/upload", upload.single("image"), Authentication, createProduct);
//update
app.post("/update", Authentication, edit);

app.get("/", Authentication, (req, res) => res.send("done"));

app.listen(Port, () => console.log(`Server is listen on Port ${Port}`));
