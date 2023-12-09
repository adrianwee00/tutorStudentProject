import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const PostForm = (props) => {
    const [text, setText] = useState("");
    const [qualification, setQualification] = useState("")
    const [subject, setSubject] = useState("")

    const [user, setUser] = useState(null);
    
    const email = props.email

    function handleClick (){
        const data = {
            qualification: qualification,
            subjects: subject,
            selfAppeal:text
        }

        axios
            .post("/post/" + email, data)  
            .then((response) => {
                if(response.data.error){
                    console.log(response.data.error)
                }else{
                    toast.success("Successfully submitted post")
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        setText("")
        setQualification("")
        setSubject("")
    }

    function handleQualification(event){
        setQualification(event.target.value)
    }

    function handleSubject(event){
        setSubject(event.target.value)
    }

    function handleText(event){
        setText(event.target.value)
    }

    return(
        <div className="container mx-auto mt-8">
            <div className="mb-4 flex flex-col">
                <div className="flex mb-2">
                <div className="flex-grow mr-12 ml-3">
                    <input value={qualification} onChange={handleQualification} type="text" className="p-2 border border-gray-300 rounded-md mr-2 w-full" placeholder="Qualification" id="positionInput"/>
                </div>
                <div className="flex-grow mr-14">
                    <input value={subject} onChange={handleSubject} type="text" className="p-2 border border-gray-300 rounded-md mr-2 w-full" placeholder="Subjects" id="subjectsInput"/>
                </div>
            </div>
        
            <div className="flex items-center mb-2 pl-2">

            <textarea value={text} onChange={handleText} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Write your post..." id="postTextarea"></textarea>
        
            <button className="ml-4 bg-gray-900 text-white px-1 py-1 rounded-md hover:text-black" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Post
            </button>
            </div>
        </div>
        </div>
    )
}

export default PostForm