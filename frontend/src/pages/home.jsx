import React from 'react'
import { Link } from 'react-router-dom'
import { FaSchool } from 'react-icons/fa'
import Navbar from '../components/navbar.jsx'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center w-5/5 h-56 '>
        <h1 className='text-white font text-4xl'>Connect with our tutors all over the world</h1>
        </div>
    </div>
  )
}

export default HomePage