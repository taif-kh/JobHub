import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Axios is a popular library for making HTTP requests
import { Link } from 'react-router-dom';
import Typewriter from "typewriter-effect";




const First = () => {

    return (
            <div className='w-screen h-screen bg-[#F6FAFD] text-[#1F2232] font-inter overflow-hidden'>
                <div className='px-[160px] py-[24px] w-full h-full'>
                    

                    {/* Main */}
                    <div className='  flex justify-between items-center'>
                        <h3 className='font-bold'>JobHub</h3>
                        <div className='flex items-center '>
                            <Link className='border-[#1F2232] border-2 rounded-md w-[100px] h-[36px] text-[12px] flex items-center justify-center' to="/login">Log in</Link>
                            <div className='w-4 h-full '></div>
                            <Link className='w-[100px] h-[36px] bg-[#1F2232] text-[#F6FAFD] rounded-md text-[12px] flex items-center justify-center' to="/signup">Sign up</Link>
                             </div>

                    </div>
                    {/* Main */}

                                                 {/* Other */}
                                                 <div className='w-full h-full flex items-center justify-center text-9xl font-bold'>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Find a job..")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Hire someone..")
                        .start();
                }}
            />  
        </div>
                             {/* Other */}

                </div>
            </div>
    );
};

export default First;