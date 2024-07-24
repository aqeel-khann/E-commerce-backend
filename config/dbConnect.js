const mongoose = require("mongoose")

const dbConnect = ()=>{
    mongoose
      .connect("mongodb://localhost:27017/ecommerce")
      .then(() => console.log("Database is Connected"))
      .catch((error) => console.log(`Error in Database Connection ${error}`));
}
  
module.exports = dbConnect;