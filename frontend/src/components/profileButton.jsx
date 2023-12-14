import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'
import toast from 'react-hot-toast';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    axios.post("/logout").then((response) => {
      if(response.data.error){
        toast.error(response.data.error)
        console.log(response.data.error)
      }else{
        Cookies.remove();
        toast.success("Successfully logout!");
        navigate("/");
    }
    })
    // Additional client-side cleanup or redirection logic
  };

  return (
    <div className="relative inline-block text-left mr-5">
      <button
        type="button"
        className="text-white focus:outline-none mt-2"
        onClick={toggleDropdown}
      >
        <CgProfile size={30}/>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a href="/myDashBoard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Dashboard
            </a>
            <button onClick={handleLogout} type='submit' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
