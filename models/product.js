const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  discount: {
    type: String,
    default: 0,
  },
  category: {
    type: Array,
    default: [],
    },
    product_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        require:true
  }
});

const Product = mongoose.model("Product", productShema);

module.exports = Product;
