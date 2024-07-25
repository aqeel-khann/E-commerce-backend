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
    res.status(400).json({ msg: error.message });
  }
}


//edit Product

const editProduct = async (req, res) => {
    // console.log(req)
    try {
        const { product_id, name, price, imageUrl, category } = req.body;
        // console.log("Product id is :", product_id);
        // console.log("name is :", name);
        const updateData = { name, price, imageUrl, category };
        const isProductUpdate = await Product.findByIdAndUpdate(product_id,updateData,{ new: true }).populate("product_owner")
        // console.log("find product is ",isProductUpdate)
        if (!isProductUpdate) return res.status(404).json({ status: false, msg: "Product not Update" });

        return res.status(200).json({ status: true, msg: "Product is Update" , product:isProductUpdate});
    } catch (error) {
        return res.status(404).json({msg:`Bad Request at Product Update ${error}`});
        
    }

}

//delete Product

const deleteProduct =async (req, res) => {
     try {
       const { product_id} = req.body;
       console.log("Product id is :", product_id);
       const isProductDelete = await Product.findByIdAndDelete(product_id) 
       if (!isProductDelete)
         return res.status(404).json({ status: false, msg: "Product not Deleted" });

       return res.status(200).json({status: true,msg: "Product is Delete",product: isProductDelete});
     } catch (error) {
        return res.status(404).json({ msg: `Bad Request at Product Delete ${error}` });
       
     }
}

module.exports={createProduct,editProduct ,deleteProduct}