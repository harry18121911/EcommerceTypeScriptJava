import axios from 'axios'
import { useState, useEffect, Key } from 'react'
import Pagination from './Pagination'

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
    }, [])

    function getAllCategories() {
        axios.get("http://localhost:8080/category").then((response) => {
            setCategory(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const handleDelete = async (id: Key) => {
        try {
            const render = await axios.delete(`http://localhost:8080/deletecategory/${id}`);
            if (render) {
                getAllCategories();
            }
        } catch (error) {
            console.error(error);
        };


    }

    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostsPerPage] = useState(2);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex- postPerPage;

    const currentPosts = category.slice(firstPostIndex, lastPostIndex);

    /* Pagination */

    return (
        <div>
            <div>Category Count {category.length}</div>
            <table>
                <thead>

                    <tr>
                        <th>Category Name</th>
                        <th>Category Image</th>
                        <th>Category Status</th>
                    </tr>
                </thead>
                <tbody>

                    {currentPosts.map((categories => (

                        <tr key={categories.id}>
                            <td>{categories.id}</td>
                            <td>{categories.name}</td>
                            <td><img style={{ width: 500 }} src={`http://localhost:8080/category/${categories.imageName}`} alt=""></img></td>
                            <td><img src={`/public/vite.svg`} alt=""></img></td>
                            <td>{categories.imageName}</td>
                            <td><button>Edit</button></td>
                            <td><button onClick={() => handleDelete(categories.id)}>Delete</button></td>

                        </tr>

                    )))}

                    <Pagination totalPosts={category.length} postsPerPage={postPerPage} setCurrentPage={setCurrentPage}/>
                    {/* {category.map((categories => (
                        
                        <tr key={categories.id}>
                            <td>{categories.id}</td>
                            <td>{categories.name}</td>
                            <td><img style={{width:500}} src={`http://localhost:8080/category/${categories.imageName}`} alt=""></img></td>
                            <td><img src={`/public/vite.svg`} alt=""></img></td>
                            <td>{categories.imageName}</td>
                            <td><button>Edit</button></td>
                            <td><button onClick={()=>handleDelete(categories.id)}>Delete</button></td>
                            
                        </tr>

                    )))} */}

                </tbody>
            </table>

        </div>
    )
}


export default ShowCategoryComponent