import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './pages/Signin'
import { SignUp } from './pages/Signup'
import { Blog } from './pages/Blog'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/blog/:id' element={<Blog/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
