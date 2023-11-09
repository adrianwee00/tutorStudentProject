import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai'
import { Link } from 'react-router-dom';

const Login = () => {
    const [users, getUsers] = useState([]);
    const [loading, setLoading] = useState(false);  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
/*
    useEffect(() => {
        setLoading(true);
        axios
          .get("/")
          .then((response) => {
            getUsers(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, []);

*/

    function handleClick() {
        const data = {
            email,
            password,
        };
        console.log(email);
    
        axios
            .post("/login", data)
            .then((response) => {
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }
/*
    function handleClick() {
        const targetUser = users.find((user) => {
            if (user.email===email) {
                if (user.password===password){
                    if (user.name){
                        navigate("/myPage");
                        console.log("Login successful");
                        return true;
                    }else{
                        navigate("/userDetails");
                        return true;
                    }   
                }else{
                    console.log("this is crazy");
                }
            }else{
                console.log("user not found");
            }
        })
    }
*/
    
    function handlePassword(event){
        setPassword(event.target.value);
    }

    function handleEmail(event){
        setEmail(event.target.value);
    }

  return (
    <div className='h-screen'>
    <div className='m-4 text-6xl'>
    <Link to={"/"}>
        <AiFillHome/>
    </Link>
    </div>
    <div className='flex flex-col items-center justify-center w-5/5'>
        <h1 className='text-3xl text-white mb-5'>Login Page</h1>
        <div className="mb-6 w-9/12">
            <label htmlFor="email" className="mb-2 text-xl font-medium text-gray-900 dark:text-white">Your email</label>
            <input name="email" onChange={handleEmail} value={email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-6 w-9/12">
            <label htmlFor="password" className="mb-2 text-xl font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" onChange={handlePassword} value={password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
        </div>
        <div className="flex items-start mb-6 w-9/12">
            <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                <label htmlFor="remember" className="ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
        </div>
        <button onClick={handleClick} type="submit" className="justify-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
  </div>
  </div>
  )
}

export default Login