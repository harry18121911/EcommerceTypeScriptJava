import { ChangeEvent, FormEvent, SyntheticEvent, useState, } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductComponent = () => {

    const defaultFile = new File([], "default");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.0);
    const [stock, setStock] = useState(0.0);
    const [file, setFile] = useState<File>(defaultFile);

    const navigate = useNavigate();



    function saveProduct(e: SyntheticEvent) {
        e.preventDefault();
        if (typeof file === "undefined") return;


        const formData = new FormData;
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("stock", stock.toString());
        formData.append("file", file);
        axios.post("http://localhost:8080/saveproduct", formData, {
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
                <form action="http://localhost:8080/savecategory" method="post" encType="multipart/form-data"  >
                    <div>
                        <label>Enter Product</label> <input type="text" name="name" value={name} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setName(target.value)} />
                    </div>
                    <div>
                        <label>Enter Description</label><input type="text" name="description" value={description} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setDescription(target.value)} />
                    </div>
                    <div>
                        <label>Enter Price</label><input type="number" name="price" value={price} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setPrice(target.valueAsNumber)} />
                    </div>
                    <div>
                        <label>Enter Stock</label><input type="number" name="price" value={stock} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setStock(target.valueAsNumber)} />
                    </div>

                    <div>
                        <label>Upload Category Image</label> <input type="file" name="file" onChange={imageChange} />
                    </div>



                    {/* Leave on onSubmit */}
                    <button type='submit' onClick={(e) => saveProduct(e)}>Save Product</button>
                </form>

                <div>
                    <h1>{name}</h1>
                    <h1>{description}</h1>
                    <h1>{price}</h1>
                    <h1>{stock}</h1>
                    <h1>{file.name}</h1>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;