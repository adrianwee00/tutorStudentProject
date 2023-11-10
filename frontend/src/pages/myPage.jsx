import React from 'react'
import { NavbarMyPage } from '../components/navbar.jsx'
import { UserContext } from '../../context/userContext.jsx'
import { useContext } from 'react'

const MyPage = () => {
  const {user} = useContext(UserContext)
  return (
    <div>
      <NavbarMyPage/>
      {!!user && (<h2 className='text-white'>Hi {user.email}!</h2>)}
    </div>
  )
}

export default MyPage