import { ChangeEvent, FormEvent, Key, SyntheticEvent, useEffect, useState, } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategoryComponent = () => {
    interface Category {
        id: Key,
        name: String,
        imageName: String,
        isActive: Boolean
    }

    const defaultCategory={
        id:0,
        name:"",
        imageName:"",
        isActive:false
    }
    const [category, setCategory] = useState<Category>(defaultCategory);

    const { categoryId } = useParams();

    useEffect(() => {
        getCategory();
    }, [categoryId]);

    function getCategory() {
        axios.get(`http://localhost:8080/categorybyid/${categoryId}`).then((response) => {
            setCategory(response.data);
            setName(response.data.name);
            setIsactive(response.data.isActive)
        }).
        catch(error => {
            console.error(error);
        })
    }


    const defaultFile = new File([], "Old Image");

    const [name, setName] = useState("name");
    const [file, setFile] = useState<File>(defaultFile);
    const [isActive, setIsactive] = useState(false);

    const navigate = useNavigate();



    function patchCategory(e: SyntheticEvent) {
        e.preventDefault();
        if (typeof file === "undefined") return;


        const formData = new FormData;
        formData.append("name", name);
        formData.append("file", file);
        formData.append("isActive", isActive.toString());
        axios.patch(`http://localhost:8080/patchcategory/${categoryId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },

        }).then((response) => {
            console.log(response.data)
            navigate("/category")
        }).catch(error => {
            console.error(error)
        });

    }


    const imageChange = (event: FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement & {
            files: FileList;
        }
        setFile(target.files[0]);
    }

    return (
        <>
            <div>
                <form action="http://localhost:8080/patchcategory/{id}" method="patch" encType="multipart/form-data"  >
                    <div>
                        <label>Enter Category</label> <input type="text" name="name" value={name} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setName(target.value)} />
                    </div>
                    <div>
                        <label>Upload Category Image</label> <input type="file" name="file" onChange={imageChange} />
                    </div>
                    <div>
                        <label>Is Active?</label><input type="checkbox" name="isActive" checked={isActive} onChange={() => setIsactive(!isActive)} />
                    </div>


                    {/* Leave on onSubmit */}
                    <button type='submit' onClick={(e) => patchCategory(e)}>Edit</button>
                </form>

                <div>
                    <h1>{name}</h1>
                    <h1>{file.name}</h1>
                    <h1>{isActive.toString()}</h1>
                </div>


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

                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.isActive.toString()}</td>
                            <td><img style={{width:500}}src={`http://localhost:8080/${category.imageName}`} alt=""></img></td>
                            <td><img src={`/public/vite.svg`} alt=""></img></td>
                            <td>{category.imageName}</td>
                            <td><button>Change Later</button></td>
                            
                        </tr>

                  

                </tbody>
            </table>

        </div>
            </div>
        </>
    )
}

export default EditCategoryComponent;