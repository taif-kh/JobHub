import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// Axios is a popular library for making HTTP requests
import { Link, redirect } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const {user, addToken} = useContext(UserContext); 
    const navigate = useNavigate();
    const [loginMsg, setLoginMsg] = useState("");

    const LoginSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const dataEntries = Object.fromEntries(data.entries());
        const dataJson = JSON.stringify(dataEntries);

        await addToken(dataJson);
        console.log("updatedUser", user.id);

        if(Number(user?.id) === 6)
        {
          navigate("/hr");
        }
        else {
          navigate("/candidate");
        }
      };




    return(
        <body className='w-screen h-screen bg-[#F6FAFD] text-[#1F2232] font-inter px-[160px] py-[24px] overflow-hidden'>


                    <div>
                    <h3 className='font-bold'><Link to="/">JobHub</Link></h3>
                    <div className='h-14 w-full'></div>
                    {/* Log in */}
<div className=''>
<div className='h-14 w-full'></div>

<h2 className="text-center font-bold">Log In</h2>
<div className='flex flex-col gap-x-5 items-center justify-center '>
<div className='h-3 w-full'></div>
<form className='w-full flex flex-col items-center px-[400px]'  onSubmit={LoginSubmit}>
<input type="text" name="email" className='rounded-lg  h-9 w-96 p-2' placeholder='Username'/>
<div className='h-4 w-full'></div>
<input type="password" name="password" className='rounded-lg  h-9 w-96 p-2' placeholder='Password'/>
<div className='h-4 w-full'></div>
<button type="submit" className='h-9 w-96 bg-[#8c9aea] text-white'><h5>Submit</h5></button>
</form>
</div>

<div className='h-14 w-full'></div>
</div>
{/* Log in */}

        </div>
        </body>
    );
};

export default Login;