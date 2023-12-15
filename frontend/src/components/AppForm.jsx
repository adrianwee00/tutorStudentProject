// PasswordAlert.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordAlert = ({ onClose, email }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  console.log(email)

  const handleConfirm = () => {
    const data = {
        appPassword: password
    }
    // Add your logic for handling the password here
    axios.post('/appPassword/' + email, data).then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
    onClose();
    navigate('/myPage');
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Enter Gmail App Password</h1>
        <input
          className="w-full h-10 px-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleInputChange}
        />
        <div className="flex justify-end">
          <button
            className="mr-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordAlert;
