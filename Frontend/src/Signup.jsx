import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate();

  const notify = () => {
    toast.success("Success!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      className: 'bg-black text-white'
    });
  };

  async function signupSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    axios.post('http://localhost:3000/sign-up', data)
      .then((response) => {
        console.log(response.data);
        notify(); // Call notify on successful response
      })
      .catch((error) => {
        console.error('There was an error submitting the form!', error);
      });

    // navigate("/");
  }

  async function submitHR(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    axios.post('http://localhost:3000/sign-up-hr', data)
      .then((response) => {
        console.log(response.data);
        notify(); 
      })
      .catch((error) => {
        console.error('There was an error submitting the form!', error);
      });

    // navigate("/");
  }

  return (
    <div className='w-screen h-screen bg-white text-black font-inter px-[160px] py-[24px] overflow-x-hidden'>
      <div className='w-full h-full'>
        <h3 className='font-bold'><Link to="/">JobHub</Link></h3>
        <div className='h-14 w-full'></div>
        <div className={`w-full flex justify-center gap-x-44 ${selectedButton !== null ? 'items-start h-32 ' : 'items-center h-40'}`}>
          <motion.button
            className={`w-60 rounded-lg flex flex-col justify-center items-center gap-y-4  ${selectedButton == "jobSeeker" ? 'bg-[#0074E8] ' : selectedButton == "employer" ? 'bg-[#0B1016]  ' : ' bg-[#0B1016] h-full '}`}
            onClick={() => setSelectedButton("jobSeeker")}
            animate={{ height: selectedButton == "employer" ||  selectedButton == "jobSeeker" ?  '4rem' : '100%' }}
            transition={{ duration: 0.75 }}
          >
{!selectedButton && (
            <img src="/candidate.png" className="w-14 h-14 invert" />
)}
            <p className=' text-white text-base'>I’m looking for a job</p>
          </motion.button>
          <motion.button
            className={`w-60 rounded-lg flex flex-col justify-center items-center gap-y-4 ${selectedButton == "employer" ? 'bg-[#0074E8] ' : selectedButton == "jobSeeker" ? 'bg-[#0B1016]  ' : ' bg-[#0B1016] h-full '}`}
            onClick={() => setSelectedButton("employer")}
            animate={{ height: selectedButton == "employer" ||  selectedButton == "jobSeeker" ?  '4rem' : '100%' }}
            transition={{ duration: 0.75 }}
          >
{!selectedButton && (
                        <img src="/recruiter.png" className='w-14 h-14 invert' />

) }
            <p className=' text-white text-base'>I’m hiring</p>
          </motion.button>
        </div>
        <div className={`w-full`}></div>

        {/* Sign up as candidate */}
        {selectedButton === "jobSeeker" ? (
          <div>
            <h2 className="text-center">Sign up as a job seeker</h2>
            <div className='h-4 w-full'></div>
            <div className='flex flex-col gap-x-5 items-center justify-center'>
              <div className='h-3 w-full'></div>
              <form className='w-full flex flex-col items-center px-[200px]' onSubmit={signupSubmit}>
                <div className='flex flex-col justify-start'>
                  <label>Username</label>
                  <input type="text" name="username" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
                </div>
                <div className='h-4 w-full'></div>
                <div className='flex flex-col justify-start'>
                  <label>Email</label>
                  <input type="text" name="email" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
                </div>
                <div className='h-4 w-full'></div>
                <div className='flex flex-col'>
                  <label>Password</label>
                  <input type="text" name="password" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
                </div>
                <div className='h-8 w-full'></div>
                <button type="submit" className='h-9 w-96 bg-[#0074E8] text-white'><h5>Submit</h5></button>
                <ToastContainer
          toastStyle={{ backgroundColor: '#0B1016', color: 'white' }} // Set the background color of individual toasts
        />
        </form>
            </div>
          </div>
        ) : selectedButton === "employer" ? (
          <div>
            {/* Sign up as recruiter */}
            <h2 className="text-center">Sign up as a recruiter</h2>
            <div className='h-4 w-full'></div>
            <div className='flex flex-col gap-x-5 items-center justify-center'>
              <div className='h-3 w-full'></div>
              <form className='w-full flex flex-col items-center px-[200px]' onSubmit={submitHR}>
                <div className='flex flex-col justify-start'>
                  <label>Username</label>
                  <input type="text" name="username" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
                </div>
                <div className='h-4 w-full'></div>
                <div className='flex flex-col justify-start'>
                  <label>Email</label>
                  <input type="text" name="email" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
                </div>
                <div className='h-4 w-full'></div>
                <div className='flex flex-col'>
                  <label>Password</label>
                  <input type="text" name="password" className='rounded-lg border-2 border-black border-opacity-50 h-9 w-96 p-2' />
                </div>
                <div className='h-8 w-full'></div>

                <div className='bg-[#0B1016] text-[#E7EAEF] w-screen flex flex-col justify-center items-center rounded-md'>
                  <div className='w-full h-8'></div>
                  <div className='flex w-full flex-col items-center '>
                    <h3 className=''>Company details</h3>
                  </div>
                  <div className='h-8 w-full'></div>
                  <div className='flex flex-col justify-start '>
                    <label>Company's name</label>
                    <input type="text" name="fullName" className='rounded-lg  h-9 w-96 p-2 text-black' />
                    <div className='h-4 w-full'></div>
                    <label>Company's address</label>
                    <input type="text" name="physicAdd" className='rounded-lg border-2 border-black h-9 w-96 p-2 text-black' />
                    <div className='h-4 w-full'></div>
                    <label>Linkedin link</label>
                    <input type="text" name="linkedin" className='rounded-lg border-2 border-black h-9 w-96 p-2 text-black' />
                    <div className='h-4 w-full'></div>
                    <label>GlassDoor link</label>
                    <input type="text" name="glassDoor" className='rounded-lg border-2 border-black h-9 w-96 p-2 text-black' />
                    <div className='h-4 w-full'></div>
                    <label>Contact Email</label>
                    <input type="text" name="contactEmail" className='rounded-lg border-2 border-black h-9 w-96 p-2 text-black' />
                    <div className='h-4 w-full'></div>
                    <label>Contact phone</label>
                    <input type="text" name="phoneNumber" className='rounded-lg border-2 border-black h-9 w-96 p-2 text-black' />
                  </div>
                  <div className='w-full h-12'></div>
                  <button type="submit" className='h-9 w-96 bg-[#0074E8] text-white'><h5>Submit</h5></button>

                  <div className='h-12 w-full'></div>
                </div>
              </form>
            </div>
            {/* Sign up as HR */}
          </div>
        ) : null}
        {/* Sign up as candidate */}
      </div>
    </div>
  );
};

export default Signup;
