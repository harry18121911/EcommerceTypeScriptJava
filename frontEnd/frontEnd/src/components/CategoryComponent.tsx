import { ChangeEvent, FormEvent, SyntheticEvent, useState, } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fs from "fs";

const CategoryComponent = () => {

  const defaultFile= new File([],"default");

  const [name, setName] = useState("");
  const [file, setFile] = useState<File>(defaultFile);
  const [isActive, setIsactive] = useState(false);

  const navigate = useNavigate();



  function saveCategory( e: SyntheticEvent) {
    e.preventDefault();
    if (typeof file === "undefined") return;
    

    const formData= new FormData;
    formData.append("name",name);
    formData.append("file",file); 
    formData.append("isActive",isActive.toString());
    axios.post("http://localhost:8080/savecategory", formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      },
      
    }).then((response) => {
      console.log(response.data)
      navigate("/category")}).catch(error =>{
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
            <label>Enter Category</label> <input type="text" name="name" value={name} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setName(target.value)} />
          </div>
          <div>
            <label>Upload Category Image</label> <input type="file" name="file"  onChange={imageChange} />
          </div>
          <div>
            <label>Is Active?</label><input type="checkbox" name="isActive" checked={isActive}  onChange={() => setIsactive(!isActive)} />
          </div>


          {/* Leave on onSubmit */}
          <button type='submit'  onClick={(e) => saveCategory(e) }></button>
        </form>

        <div>
          <h1>{name}</h1>
          <h1>{file.name}</h1>
          <h1>{isActive.toString()}</h1>
        </div>
      </div>
    </>
  )
}

export default CategoryComponent;
