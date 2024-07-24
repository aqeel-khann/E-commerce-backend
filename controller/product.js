const Product = require("../models/product");


//create Product
const createProduct = async(req,res) => {
    try {
        const {name,price,category } = req.body
        const imageUrl = req.file.path; // Cloudinary URL
        const owner_Id = req.user.id //Obtain userId for refrence
        
        // console.log("owner id is :",owner_Id);

    // Create a new product with the image URL
    const newProduct = new Product({
      name,
      price,
      imageUrl,
      category,
      product_owner:owner_Id,
    });

    await newProduct.save();

    res.status(201).json({ msg: 'Product created successfully', data: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


//edit Product

const edit = async (req, res) => {
    
    try {
        const { product_id, name, price, imageUrl, category } = req.body;
        console.log("Product id is :", product_id);
        const isProductUpdate = await Product.findByIdAndUpdate(product_id, { new: true }, { name, price, imageUrl, category }).populate("product_owner")
    console.log(isProductUpdate)
        if (!isProductUpdate) return res.status(404).json({ status: false, response: "Product not Update" });

        return res.status(200).json({ status: true, response: "Product is Update" , product:isProductUpdate});
    } catch (error) {
        return res.status(404).send("Bad Request at Product Update");
        
    }

}

module.exports={createProduct,edit}