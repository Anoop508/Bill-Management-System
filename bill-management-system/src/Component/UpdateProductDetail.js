import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useParams } from "react-router-dom";


const  UpdateProductDetail = () =>{
    const par = useParams();
    const [productDetails, setProductDetails]= useState([]);

    
    useEffect(()=>{
        getData();
    },[])

    const getData = async(item)=>{
        
        let data = {productName:par.itemName}
        console.log(data)
        let result = await fetch("http://127.0.0.1:2001/findsingleitemdetail",{
            method:"POST",
            headers:{
                "Accept":"application/json"
            },
            body:JSON.stringify(data)
        })
        result = await result.json();
        if(!result.message){
            console.log(result)
            setProductDetails(result)
            
            console.log("Hi",productDetails)
        }else{
            NotificationManager.error(result.message)
        }
    }   

    
    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
        // console.log(productDetails)
    }

    const handlePhoto = (e)=>{
        setProductDetails({...productDetails,photo:e.target.files[0]})
    }

    return(
        <>
        <h1>Update Product Detail</h1>
        <form >
                <div className="table">
                    <table border="2px solid black">
                        <tbody>
                            <tr><th>Product Name</th><td><input type="text" value={productDetails.productName} name="productName" onChange={handleChange} /></td></tr>
                            <tr><th>Price</th><td><input type="Number" value={productDetails.price} name="price" onChange={handleChange} /></td></tr>
                            <tr><th>Image</th><td><input type="file" name="photo" accept={".jpg"&&".png"} onChange={handlePhoto} />
                                <div>
                                    {
                                        productDetails.photo ? <img alt="ProdcutImage" style={{ width: "100px", height: "150px" }} src={URL.createObjectURL(productDetails.photo)} /> : <img alt="ProdcutImage"  style={{ width: "100px", height: "150px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" />
                                    }
                                </div>
                            </td>
                            </tr>
                            <tr><th colSpan={2}><input type="submit" /></th></tr>
                        </tbody>
                    </table>

                </div>
            </form>
        </>
    )
}
export default UpdateProductDetail;