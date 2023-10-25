const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    price:String,
    imageUrl:String
})

module.exports=new mongoose.model("productlists",productSchema)