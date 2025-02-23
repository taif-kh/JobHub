import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, addToken } = useContext(UserContext);
  const navigate = useNavigate();


  const LoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataEntries = Object.fromEntries(data.entries());
    const dataJson = JSON.stringify(dataEntries);

    await addToken(dataJson);
  };

  useEffect(() => {
      if (user?.isHr == true) {
        navigate("/hr");
      } else if (user?.isHr == false) {
          navigate("/candidate");
        }      
    
  }, [user, navigate]);

  return (
    <body className='w-screen h-screen bg-[#F6FAFD] text-[#1F2232] font-inter px-[160px] py-[24px] overflow-hidden'>
      <div>
        <h3 className='font-bold'><Link to="/">JobHub</Link></h3>
        <div className='h-14 w-full'></div>
        {/* Log in */}
        <div className=''>
          <div className='h-14 w-full'></div>
          <h2 className="text-center font-bold">Log In</h2>
          <div className='h-4 w-full'></div>
          <div className='flex flex-col gap-x-5 items-center justify-center '>
            <div className='h-3 w-full'></div>
            <form className='w-full flex flex-col items-center px-[400px]' onSubmit={LoginSubmit}>
              <div className='flex flex-col justify-start'>
                <label>Email</label>
                <input type="text" name="email" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
              </div>
              <div className='h-4 w-full'></div>
              <div className='flex flex-col'>
                <label>Password</label>
                <input type="password" name="password" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
              </div>
              <div className='w-full h-8'></div>
              <button type="submit" className='h-9 w-96 bg-[#0074E8] text-white'><h5>Submit</h5></button>
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