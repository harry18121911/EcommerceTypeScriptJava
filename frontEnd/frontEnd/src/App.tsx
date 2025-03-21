import { BrowserRouter, Route,Routes } from 'react-router-dom'
import CategoryComponent from './components/CategoryComponent'
import ShowCategoryComponent from './components/ShowCategoryComponent'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<CategoryComponent/>}></Route>
      <Route path='/category' element={<ShowCategoryComponent/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
