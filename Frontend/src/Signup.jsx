import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Axios is a popular library for making HTTP requests
import { Link, useNavigate } from 'react-router-dom';




const Signup = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const navigate = useNavigate();
    
  async function signupSubmit(e) {
    e.preventDefault(); 
  
    const formData = new FormData(e.target); 
    const data = Object.fromEntries(formData.entries());
  
    axios.post('http://localhost:3000/sign-up', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error submitting the form!', error);
      })

      navigate("/");
    };

    async function submitHR(e) {
      e.preventDefault(); 
    
      const formData = new FormData(e.target); 
      const data = Object.fromEntries(formData.entries());
    
      axios.post('http://localhost:3000/sign-up-hr', data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('There was an error submitting the form!', error);
        })
  
        navigate("/");
      };


    return (
        <body className='w-screen h-screen bg-white text-black font-inter px-[160px] py-[24px] overflow-x-hidden'>
          <div className='  w-full h-full'>
          <h3 className='font-bold'><Link to="/">JobHub</Link></h3>
          <div className='h-14 w-full'></div>
          <div className='w-full h-40  flex items-center justify-center gap-x-44  '>
            <button className={`w-60 h-full rounded-lg flex items-end pb-8 pl-5 ${selectedButton == "jobSeeker" ? 'bg-[#0074E8]' : ' bg-black ' } `} onClick={() => setSelectedButton("jobSeeker")}>
              <p className='underline text-white text-base '>I’m looking for a job</p>
            </button>
            <button className={`w-60 h-full  rounded-lg flex items-end pb-8 pl-5 ${selectedButton == "employer" ? 'bg-[#0074E8]' : 'bg-black' } `} onClick={() => setSelectedButton("employer")}>
              <p className='underline text-white text-base '>I’m hiring</p>
            </button>
          </div>
          <div className='h-20  w-full '></div>

          {/* Sign up as candidate */}
{ selectedButton === "jobSeeker" ? (
  
<div>
<h2 className="">Sign up as a candidate</h2>
<div className='flex flex-col gap-x-5 items-center justify-center'>
<div className='h-3 w-full'></div>
<form className='w-full flex flex-col items-start px-[400px]' onSubmit={signupSubmit}>
<label>Username</label>
<input type="text" name="username" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Email</label>
<input type="text" name="email" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Password</label>
<input type="text" name="password" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<button type="submit" className='w-32 border-2 border-black h-10'><h5>Apply</h5></button>
</form>
</div>
</div>
) : selectedButton === "employer" ? (
  <div>
    
          {/* Sign up as HR */}
          <h2 className="text-center">Sign up as a HR manager</h2>
<div className='flex flex-col gap-x-5 items-center justify-center'>
<div className='h-3 w-full'></div>
<form className='w-full flex flex-col items-start px-[400px]' onSubmit={submitHR}>
<label>Username</label>
<input type="text" name="username" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Email</label>
<input type="text" name="email" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Password</label>
<input type="text" name="password" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<div className='flex w-full justify-center pr-9'><h5 className='font-bold'>Company details</h5></div>
<label>Company's name</label>
<input type="text" name="fullName" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Company's address</label>
<input type="text" name="physicAdd" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Linkedin link</label>
<input type="text" name="linkedin" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>GlassDoor link</label>
<input type="text" name="glassDoor" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Contact Email</label>
<input type="text" name="contactEmail" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<label>Contact phone</label>
<input type="text" name="phoneNumber" className='rounded-lg border-2 border-black h-9 w-96 p-2' />
<div className='h-4 w-full'></div>
<button type="submit" className='w-32 border-2 border-black h-10'><h5>Apply</h5></button>
</form>
</div>
{/* Sign up as HR */}
  </div>
) : null}
{/* Sign up as candidate */}

<div className='h-24 w-full '></div>

          </div>


        </body>
    );
};
export default Signup;
