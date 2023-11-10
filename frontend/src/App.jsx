import React, { StrictMode } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import MyPage from './pages/myPage'
import axios from 'axios'
import UserDetail from './pages/userDetail'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'

axios.defaults.baseURL = "http://localhost:5555/user";
axios.defaults.withCredentials = true; // this is super important in order for axios to save the cookies 

const App = () => {
  return (
    <UserContextProvider>
    <Toaster position='bottom-right' toastOptions={{error:{duration:2000}}}/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/userLogin' element={<Login/>}/>
      <Route path='/userRegister' element={<Register/>}/>
      <Route path='/myPage' element={<MyPage/>}/>
      <Route path='/userDetails' element={<UserDetail/>}/>
    </Routes>
    </UserContextProvider>
  )
}

export default App