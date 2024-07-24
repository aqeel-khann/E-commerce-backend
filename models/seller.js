const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
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
  sales: {
    type: Array,
    default: [],
  },
});

const Seller = mongoose.model("Seller", SellerSchema);

module.exports = Seller;
