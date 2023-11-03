import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import MyPage from './pages/myPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/userLogin' element={<Login/>}/>
      <Route path='/userRegister' element={<Register/>}/>
      <Route path='/myPage' element={<MyPage/>}/>
    </Routes>
  )
}

export default App