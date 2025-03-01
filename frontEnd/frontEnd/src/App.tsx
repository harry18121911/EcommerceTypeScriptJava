import { ChangeEvent, useState } from 'react'
import './App.css'

function App() {

  type category = {
    name: string;
    imageName: string;
    isActive: boolean;
  }

  const [name,setName] = useState("");
  const [imageName,setImageName] = useState("");
  const [isactive,setIsactive] = useState(false);
  const [category, setCategory] = useState<category>({ name: name, imageName: imageName , isActive: isactive});
  return (
    <>
      <div>
        <form action="http://localhost:8080/savecategory" method="post" encType="multipart/form-data">
          <div>
            <label>Enter Category</label> <input type="text" name="name" value={name} onChange={({target}:ChangeEvent<HTMLInputElement>)=>setName(target.value)} />
          </div>
          <div>
            <label>Upload Category Image</label> <input type="file" name="imageName" value={imageName} onChange={({target}:ChangeEvent<HTMLInputElement>)=>setImageName(target.value)} />
          </div>
          <div>
            <label>Is Active?</label><input type="checkbox" name="isactive" checked={isactive} onChange={()=>setIsactive(!isactive)}/>
          </div>

          <button type='submit' onClick={() => setCategory(category)}></button>
        </form>

        <div>
          <h1>{name}</h1>
          <h1>{imageName}</h1>
          <h1>{isactive}</h1>
        </div>
      </div>
    </>
  )
}

export default App
