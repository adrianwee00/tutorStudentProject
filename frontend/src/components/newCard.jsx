import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewCard = (props) =>{
    const navigate = useNavigate()
    const data = {
      email: props.email
    }
    function handleClick (){
      navigate('/contact')
      console.log(data.email)
      axios.post("/cookies",data).then((response) => {
        console.log(response)
      }).catch((err)=>{
        console.log(err)
      })
    }
    return(
        <div>
            <div className="bg-gray-700 border-yellow border-2 p-6 rounded-lg shadow-md relative profile-card " id="profileCard2">
        <div className="flex items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">{props.name}</h2>
            <p className="text-white font-semibold text-sm">{props.qualification}</p>
            <p className="text-white font-semibold text-sm mb-0.2">{props.subject}</p>
            <p className="text-white text-sm italic">{props.selfAppeal}</p>
          </div>
            <button className="contact-button" onClick={handleClick}>Contact</button>
        </div>
      </div>
        </div>
    )
}

export default NewCard;