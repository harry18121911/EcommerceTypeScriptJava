import axios from 'axios'
import { useState, useEffect, Key } from 'react'

const ShowCategoryComponent = () => {

    interface Category {
        id: Key,
        name: String,
        imageName: String,
        isActive: Boolean
    }


    const [category, setCategory] = useState<Category[]>([])


    useEffect(() => {
        getAllCategories()
    }, [category])

    function getAllCategories() {
        axios.get("http://localhost:8080/category").then((response) => {
            setCategory(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    function handleDelete(id:Key ){
        axios.delete(`http://localhost:8080/deletecategory/${id}`);
    }

    


    return (
        <div>
            <table>
                <thead>

                    <tr>
                        <th>Category Name</th>
                        <th>Category Image</th>
                        <th>Category Status</th>
                    </tr>
                </thead>
                <tbody>

                    {category.map((categories => (
                        <tr key={categories.id}>
                            <td>{categories.id}</td>
                            <td>{categories.name}</td>
                            <td><img src={`http://localhost:8080/${categories.imageName}`} alt=""></img></td>
                            <td><img src={`/public/vite.svg`} alt=""></img></td>
                            <td>{categories.imageName}</td>
                            <td><button>Edit</button></td>
                            <td><button onClick={()=>handleDelete(categories.id)}>Delete</button></td>
                            
                        </tr>

                    )))}

                </tbody>
            </table>

        </div>
    )
}


export default ShowCategoryComponent