const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const { tokenGenration } = require("../token/tokenGenration");
const Seller = require("../models/seller");

//cookie middleware
app.use(cookieParser());

//signup
const sellerSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //if user already exist
    const user = await Seller.findOne({ email });
    if (user) {
      return res.status(409).send("Email is already Register");
    }
    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //handle userData
    const newSeller = await Seller.create({
      name,
      email,
      password: hashPassword,
    //   role,
    });
    res.status(201).json({ msg: "User Created Successfully", data: newSeller });
  } catch (error) {
    res.status(400).send(`Bad Request ${error}`);
  }
};
//login
const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //is User mail Exist?
    const isUser = await Seller.findOne({ email });
    if (!isUser) {
      return res.status(401).send("Email is Incorrect");
    }
    //is paswword Match?
    const isMatch = bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res.status(401).send("Password is Incorrect");
    }
    //Token Genration
    const token = tokenGenration(isUser);

    //setting cookies
    res.cookie("Token", token, { httponly: true, secure: false });
    return res.status(200).json({ msg: "Seller Login Successfully", token });
  } catch (error) {
    return res.status(400).send(`Bad Request ${error}`);
  }
};

module.exports = { sellerSignup, sellerLogin };
