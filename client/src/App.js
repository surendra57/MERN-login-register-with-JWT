import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/quote';
import Register from './pages/Register'

const App = () => {
  return (
      <>
      <BrowserRouter>
      <Routes>
          {/* <Route path="/"  element={user && user._id ? <Homepage/>:<Login/>}/> */}
           <Route path="/login" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/dashboard" element={<Dashboard/>}/>
       </Routes>
      </BrowserRouter>
      </>
  )
}

export default App