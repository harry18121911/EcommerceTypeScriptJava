import axios from 'axios'
import { useState, useEffect, Key } from 'react'

const ShowProductComponent= () => {

    interface Product{
        id: Key,
        name: String,
        imageName: String,
        price:number,
        stock:number
    }

    const [product, setProduct] = useState<Product[]>([])

    useEffect(() => {
        getAllProduct()
    },[]) 

    function getAllProduct() {
        axios.get("http://localhost:8080/product").then((response) => {
            setProduct(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const handleDelete=async(id:Key )=>{
        try{
        const render = await axios.delete(`http://localhost:8080/deletecategory/${id}`);
        if(render){
        getAllProduct();
        }
        }catch(error){
            console.error(error);
        };
        
        
    }

    


    return (
        <div>
            <div>Product Count {product.length}</div>
            <table>
                <thead>

                    <tr>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Product Status</th>
                    </tr>
                </thead>
                <tbody>

                    {product.map((products=> (
                        
                        <tr key={products.id}>
                            <td>{products.id}</td>
                            <td>{products.name}</td>
                            <td>{products.price}</td>
                            <td>{products.stock}</td>
                            <td><img style={{width:500}} src={`http://localhost:8080/product/${products.imageName}`} alt=""></img></td>
                            <td>{products.imageName}</td>
                            <td><button>Edit</button></td>
                            <td><button onClick={()=>handleDelete(products.id)}>Delete</button></td>
                            
                        </tr>

                    )))}

                </tbody>
            </table>

        </div>
    )
}


export default ShowProductComponent