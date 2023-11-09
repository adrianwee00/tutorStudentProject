import React from 'react'
import { Link } from 'react-router-dom'
import { FaSchool } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div>
        <nav>
            <div className="bg-gray-700 flex justify-between items-center h-20">
                <div className="text-white text-2xl font-semibold mx-4">
                <div className='flex'>
                <FaSchool className='mt-1'/>
                <h1 className='mx-2'>Freedemy</h1>
                </div>
                </div>
                <div>
                <Link to = "/userRegister">
                <button className="text-white bg-gray-500 hover:bg-gray-600 p-4 text-lg py-3">Register</button>
                </Link>
                <Link to = "/userLogin">
                <button className="text-white hover:bg-gray-600 border-4 text-lg mx-6 py-2 px-4">Login</button>
                </Link>
                </div>
            </div>
        </nav>
    </div>
  )
}

const NavbarMyPage = () => {
    return (
      <div>
          <nav>
              <div className="bg-gray-700 flex justify-between items-center h-20">
                  <div className="text-white text-2xl font-semibold mx-4">
                  <div className='flex'>
                  <FaSchool className='mt-1'/>
                  <h1 className='mx-2'>Freedemy</h1>
                  </div>
                  </div>
              </div>
          </nav>
      </div>
    )
  }

export default Navbar
export {NavbarMyPage}