const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const { tokenGenration } = require("../token/tokenGenration");
const Buyer = require("../models/buyer");

//cookie middleware
app.use(cookieParser());

//signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    //if user already exist
    const user = await Buyer.findOne({ email });
    if (user) {
      return res.status(409).send({ msg: "Email is already Register" });
    }
    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //handle userData
    const newBuyer = await Buyer.create({
      name,
      email,
      password: hashPassword,
      //   role,
    });
    res.status(201).json({ msg: "Buyer Created Successfully", data: newBuyer });
  } catch (error) {
    res.status(400).send(`Bad Request ${error}`);
  }
};
//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //is User mail Exist?
    const isUser = await Buyer.findOne({ email });
    if (!isUser) {
      return res.status(401).send({ msg: "Email is Incorrect" });
    }
    //is paswword Match?
    const isMatch = bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res.status(401).send({ msg: "Password is Incorrect" });
    }
    //Token Genration
    const token = tokenGenration(isUser);

    //setting cookies
    res.cookie("Token", token, { httponly: true, secure: false });
    return res.status(200).json({ msg: "Buyer Login Successfully", token });
  } catch (error) {
    return res.status(400).send({ msg: `Bad Request ${error}` });
  }
};

module.exports = { signup, login };
