import axios from 'axios'
import { useState, useEffect, Key } from 'react'
import { useNavigate } from 'react-router-dom'

const ShowCategoryComponent = () => {

    interface Category {
        id: Key,
        name: String,
        imageName: String,
        isActive: Boolean
    }

    const navigate = useNavigate();

    const [category, setCategory] = useState<Category[]>([])


    useEffect(() => {
        getAllCategories()
    }, [])

    function getAllCategories() {
        axios.get("http://localhost:8080/category").then((response) => {
            setCategory(response.data)
        }).catch(error => {
            console.error(error);
        })
        navigate("/category");
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
                            <td>{categories.imageName}</td>
                        </tr>

                    )))}

                </tbody>
            </table>

        </div>
    )
}


export default ShowCategoryComponent