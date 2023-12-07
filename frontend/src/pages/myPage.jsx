import React from 'react'
import { NavbarMyPage } from '../components/navbar.jsx'
import { UserContext } from '../../context/userContext.jsx'
import { useContext, useState, useEffect } from 'react'
import Card from '../components/card.jsx'
import axios from 'axios'

function createCard(personal){
  return(
    <Card
      key = {personal.id}
      Name = {personal.name}
      Qualifications = {personal.qualification}
      Subjects = {personal.subject}
    />
  )
}

const MyPage = () => {
  //The code below is replaced by using useEffect alone
  //const {user} = useContext(UserContext)
  const [posts, setPost] = useState(null);
  var email = "";
  
  const [user, setUser] = useState(null);
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
                console.log(data)
            })
        }
    }, [user])

  
  if(user){
    email = user.email;
    console.log(email);
  }

  // to get post from the database
  useEffect(() => {
    if(user && user.email){ //only run this code when user and user.email exist, if not, axios will send get request before email has a value
                            // when loading up the page 
    axios.get(`/post/${email}`).then(({data}) => {
      console.log(data)
      console.log(`/post/${email}`)
      setPost(data)
    })
  }
  }, [user]) // refresh when getting a user data, without [user], the page won't update causing to an error saying cannot 
             // access to email variable


  return (
    <div>
      <NavbarMyPage/>
      <div class="container mx-auto mt-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts && posts[0] && ( // only load this when the post variable has value, if not, there will be an error
            posts.map(createCard)
          )}
        {/*
        {posts.map((post) => {
          post.personalPost.map((personal) => {
            return (
              <Card
              Name = "hey"
              Qualifications = {personal.Qualification}
              Subjects = {personal.personalPost.Subjects}
            />
            )
          })
        }
          )
        }
        /*}

        {/*
        {!!user && (<h2 className='text-white'>Hi {user.email}!</h2>)}
        */}
        </div>
      </div>
    </div>
  )
}

export default MyPage