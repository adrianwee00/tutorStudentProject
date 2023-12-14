import React from "react";
import {NavbarMyPage} from "../components/navbar.jsx";
import { UserContext } from '../../context/userContext.jsx'
import { useContext, useState, useEffect } from 'react'
import axios from "axios";
  
const MyDash = () => {
  const {user} = useContext(UserContext);
  const [personalPost, setPost] = useState();
  const [name, setName] = useState();
  const [count, setCount] = useState(0);

  const Card = (props) => {
    function handleClick (){
        const id = props.id
        axios.delete(`/${props.id}`)
             .then((response) => {
                console.log(response)
                setCount(count+1)
             })
             .catch((err) => {
                console.log(err)
             })
    }
    return(
        <div>
            <div className="bg-gray-700 border-yellow border-2 p-6 rounded-lg shadow-md relative profile-card " id="profileCard2">
            <div className="flex items-center mb-4">
            <div>
                <p className="text-white font-semibold text-sm">{props.Qualifications}</p>
                <p className="text-white font-semibold text-sm mb-0.2">{props.Subjects}</p>
                <p className="text-white text-sm italic">{props.selfAppeal}</p>
            </div>
                <button className="contact-button-new" onClick={handleClick}>Delete</button>
            </div>
        </div>
        </div>
    )
  }

  function createCard(personal){
    return(
      <Card
        key = {personal._id}
        id = {personal._id}
        Qualifications = {personal.Qualification}
        Subjects = {personal.Subjects}
        selfAppeal = {personal.SelfAppeal}
      />
    )
  }

  const fetchData = () => {
    if (user){
      axios.get('myDashboard/' + user.email)
            .then((response) => {
              const data = response.data
              console.log(data)
              setPost(data.personalPost)
              setName(data.name)
            })
  }
  }

  useEffect(() => {
      fetchData();
  }, [user, count])

  return (
      <div>
          <NavbarMyPage/>
          {user && name && personalPost && personalPost[0] && <h1 className='text-white font text-4xl mt-6'>Thanks for contributing, {name}</h1>}
          {user && name && !personalPost[0] && <h1 className='text-white font text-4xl mt-6'>Let's start contributing to this society with our knowledge!</h1>}
          <div className="container mx-auto mt-8 profile-card-container"> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grids-cols-3 gap-4 profile-cards-container">
          {(personalPost) && 
          personalPost.map(createCard)
          }
          </div>
          </div>
      </div>
  )
}

export default MyDash;