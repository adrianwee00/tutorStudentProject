import React from 'react'
import { NavbarMyPage } from '../components/navbar.jsx'
import { UserContext } from '../../context/userContext.jsx'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const MyPage = () => {
  //The code below is replaced by using useEffect alone
  //const {user} = useContext(UserContext)

  const [user, setUser] = useState(null);
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [user])
  return (
    <div>
      <NavbarMyPage/>
      {!!user && (<h2 className='text-white'>Hi {user.email}!</h2>)}
    </div>
  )
}

export default MyPage