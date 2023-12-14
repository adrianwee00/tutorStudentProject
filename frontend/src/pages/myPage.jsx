import React from 'react'
import { NavbarMyPage } from '../components/navbar.jsx'
import { UserContext } from '../../context/userContext.jsx'
import { useContext, useState, useEffect } from 'react'
import PostForm from '../components/postForm.jsx'
import NewCard from '../components/newCard.jsx'
import axios from 'axios'

function createNewCard(personal){
  return(
    <NewCard
      key = {personal.id}
      name = {personal.name}
      qualification = {personal.qualification}
      subject = {personal.subject}
      selfAppeal = {personal.selfAppeal}
      email = {personal.email}
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
      { user &&(
      <PostForm
        email = {user.email}
      />
      )}
      <div className="container mx-auto mt-8 profile-card-container"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grids-cols-3 gap-4 profile-cards-container">
          {posts && posts[0] && (
            posts.map(createNewCard)
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