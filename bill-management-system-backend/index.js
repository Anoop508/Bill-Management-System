const express = require('express');
const app = express();
require('./Config')
const productSchema = require('./ProductSchema');
var cors = require('cors')
const multer  = require('multer')

app.use('/images', express.static('images'))

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'images');
    },
    filename: function(req, file, cb){
        // console.log(file);
        cb(null, file.fieldname + "-" + Date.now()+".jpg");
    }
});

const fileFilter = (req, file, cb)=>{
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(null, false);
    }
}

let upload = multer({storage, fileFilter});

app.use(express.json());
app.use(cors())
app.post("/addproduct", upload.single('photo') ,async(req, resp)=>{

    // console.log(req.body)
    // console.log(req.file.filename);
       const productName=req.body.productName.trim();
       const price=req.body.price;
       const imageUrl=req.file.filename
    const userdata = {
        productName,
        price,
        imageUrl
    }
    if(userdata.productName && userdata.price && userdata.imageUrl){
        const data = productSchema(userdata)
        const result = await data.save();
        resp.send(result);
    }else{
        resp.send({message:"Something went wrong in required data"});
    }    
})

app.get('/showproduct',async(req,resp)=>{
    const result = await productSchema.find();
    if(result.length>0){
        resp.send(result);
    }else{
        resp.send({message:"No Data found"})
    }

})

app.delete('/itemDelete', async(req, resp)=>{
    
    const verify = await productSchema.find(req.body);
    if(verify.length>0){
        const result = await productSchema.deleteOne(req.body)
        if (result.deletedCount > 0) {
            resp.send(result);
        } else {
            resp.send({ message: "Something went wrong" })
        }
    }else{
        resp.send({message:'Data is not found'})
    }
    
    
})

app.post('/findsingleitemdetail', async(req, resp)=>{
    console.log(req.body)
    const result = await productSchema.findOne(req.body);
    if(result.length>0){
            resp.send(result);
    }else{
        resp.send({message:'Something went wrong'})
    }
    
    
})



app.listen(2001);