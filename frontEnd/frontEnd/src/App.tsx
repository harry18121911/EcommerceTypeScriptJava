import { BrowserRouter, Route,Routes } from 'react-router-dom'
import CategoryComponent from './components/CategoryComponent'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<CategoryComponent/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
