import { useEffect, useState } from "react"
import { NotificationManager } from "react-notifications";
import {useNavigate} from 'react-router-dom';

const Showproduct = () =>{

    const [productDetails, setProductDetails] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        getproductList();
    },[])

    const getproductList = async()=>{
        let result = await fetch('http://127.0.0.1:2001/showproduct',{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'GET',
        })
        result = await result.json();
        
        if(!result.message){
            // console.log(result)
            setProductDetails(result)
            // console.log(result)
        }else{
            NotificationManager.error(result.message)
        }

    }

    const productDelete = async(item)=>{
        const data = {productName:item}
        console.log(data)
        let result = await fetch('http://127.0.0.1:2001/itemDelete',{
            method:'DELETE',
            headers:{
                "Accept":'application/json'
            },
            body:JSON.stringify(data)
        })
        result = await result.json();
        if(!result.message){
            if(result.deletedCount>0){
                NotificationManager.success(data.productName+" is deleted successfully")
                getproductList();
            }else{
                NotificationManager.error("Something went wrong Data is still not deleted")
            }
        }else{
            NotificationManager.warning(result.message);
        }
        
    }

    const productupdate = (item)=>{    
        navigate('/updateproductdetail/'+item)
    }

    return(
        <>
        <h1>Product List</h1>
        <table border="1px solid black">
            <tbody>
                <tr><th>S.no</th><th>Product Name</th><th>Price</th><th>Image</th><th>Action</th></tr>
                {
                    productDetails.map((item, key)=>
                    <tr key={key}><th>{key+1}</th><th>{item.productName}</th><th>{item.price}</th>
                    <th><img style={{width:"120px", height:"180px"}} alt="productimg" src={`http://localhost:2001/images/`+item.imageUrl} /></th>
                    <th><button onClick={()=>productDelete(item.productName)}>Delete</button><br/>
                    <button onClick={()=>productupdate(item.productName)}>Update</button></th>
                    </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}
export default Showproduct