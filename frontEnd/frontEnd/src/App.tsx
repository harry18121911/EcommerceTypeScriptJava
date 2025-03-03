import { ChangeEvent, useState } from 'react'
import './App.css'

function App() {

  type category = {
    name: string;
    file: string;
    isActive: boolean;
  }

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [isActive, setIsactive] = useState(false);
  const [category, setCategory] = useState<category>({ name: name, file: file, isActive: isActive });
  return (
    <>
      <div>
        <form action="http://localhost:8080/savecategory" method="post" encType="multipart/form-data">
          <div>
            <label>Enter Category</label> <input type="text" name="name" value={name} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setName(target.value)} />
          </div>
          <div>
            <label>Upload Category Image</label> <input type="file" name="file" value={file} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setFile(target.value)} />
          </div>
          <div>
            <label>Is Active?</label><input type="checkbox" name="isActive" checked={isActive} onChange={() => setIsactive(!isActive)} />
          </div>

          <button type='submit' onClick={() => setCategory(category)}></button>
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

export default App
