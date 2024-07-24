const mongoose = require("mongoose");

const BuyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
});

const Buyer = mongoose.model("Buyer", BuyerSchema);

module.exports = Buyer;
