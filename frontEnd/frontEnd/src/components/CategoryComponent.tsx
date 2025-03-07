import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fs from "fs";

const CategoryComponent = () => {

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [isActive, setIsactive] = useState(false);

  const navigate = useNavigate();

  function saveCategory(e: FormEvent) {
    e.preventDefault();
    axios.post("http://localhost:8080/savecategory", {name,file,isActive });
    (navigate("/category"));
  }


  return (
    <>
      <div>
        <form action="http://localhost:8080/savecategory" method="post" encType="multipart/form-data"  >
          <div>
            <label>Enter Category</label> <input type="text" name="name" value={name} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setName(target.value)} />
          </div>
          <div>
            <label>Upload Category Image</label> <input type="file" name="file" value={file} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setFile(target.value)} />
          </div>
          <div>
            <label>Is Active?</label><input type="checkbox" name="isActive" checked={isActive} onChange={() => setIsactive(!isActive)} />
          </div>


          {/* Leave on onSubmit */}
          <button type='submit' onSubmit={saveCategory}></button> 
        </form>

        <div>
          <h1>{name}</h1>
          <h1>{file}</h1>
          <h1>{isActive.toString()}</h1>
        </div>
      </div>
    </>
  )
}

export default CategoryComponent;
