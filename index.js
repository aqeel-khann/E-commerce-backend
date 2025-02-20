const express = require("express");
const dbConnect = require("./config/dbConnect");
const { signup, login } = require("./controller/buyer");
const Authentication = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { sellerSignup, sellerLogin } = require("./controller/seller");
const upload = require("../backend/multer");
const {
  createProduct,
  editProduct,
  deleteProduct,
} = require("./controller/product");

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
app.use(express.json());

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
app.patch("/update", Authentication, editProduct);
//delete
app.delete("/delete", Authentication, deleteProduct);

app.listen(Port, () => console.log(`Server is listen on Port ${Port}`));
