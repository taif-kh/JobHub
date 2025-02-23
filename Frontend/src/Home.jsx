import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// Axios is a popular library for making HTTP requests
import { Link, redirect, useNavigate } from 'react-router-dom';
import "../src/App.css";
import { UserContext } from './UserContext';




const Home = () => {
  const {user, removeToken} = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState({});  

  const [jobs, setJobs] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [visibleForm, setVisibleForm] = useState(true);

  const [allApps, setAllApps] = useState([]);

console.log(user);

const [loading, setLoading] = useState(true);

    // --------------------------------------------------------

setTimeout(() => {
  setLoading(false);
}, 300);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      setUploadMessage('Please select a file to upload.');
      return;
    }
  
    setVisibleForm(false);
    const formData = new FormData();
    formData.append('resumeLink', selectedFile); // 'resumeLink' matches the backend field name
    formData.append('userId', user.id); // Append userId to formData
  
    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setUploadMessage(response.data);

      setCurrentUser(prevState => ({
        ...prevState,
        predField: response.data.predicted_category,  
        recJob: response.data.recommended_job,      
      }));

      window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('Error uploading file. Please try again.');
    }
  };
  
  
  useEffect(() => {
    axios.get('http://localhost:3000/jobs').then((response) => {
      setJobs(response.data);
      console.log(response.data);
    });


    axios.get('http://localhost:3000/jobs/candApps').then((response) => {
      setAllApps(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3000/users/${user.id}`).then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [user?.id]); 


  const applyJob = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
      await axios.post('http://localhost:3000/users/apply', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply for the job.');
    }
  };

  //-------
  let recJobs = jobs.filter(job => (job.name  === currentUser.predField) || (job.name  === currentUser.recJob));

  let myApps = allApps.filter(app => Number(app.userId) === Number(user.id) );
  console.log(myApps);
  
  return (
    <html lang="en">
{ !loading && (
        <body className="border-white border-2 flex flex-col px-40 font-inter bg-[#F6FAFD] text-[#1F2232] ">
        {user && (
          // USER EXISTS
          <div className="bg-[#F6FAFD] text-black">
                    {/* token */}
            <div className='text-[#F6FAFD] text-xs'>

            <p>Name: {user.username} Id: {user.id} Email: {user.email}</p>

            <p>
              {user.token || localStorage.getItem("jwt_token")}
            </p>
            {uploadMessage && 
        <p>{uploadMessage.fileUrl}</p>
      }
            </div>
                    {/* token */}


{/* Welcome */}
<div className='flex justify-between items-end'>
  <h5>Welcome, {user.username}</h5>
<button onClick={() => {
              removeToken();
              navigate("/");
            }} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
              Log Out
            </button>
</div>
{/* Welcome */}


            {/* ------------------------------------------------------ */}
            {/* MAIN */}
            <div className=''>
<div className='h-14 w-full '></div>

{/* Recommended */}
{
  currentUser.predField ?  (
    <div className='flex gap-x-5 text-white '>
<div className='h-32 w-80 bg-[#0074E8] px-4 pt-6'>
  <h6 className='underline underline-offset-4'>Your field/</h6>
  <div className='h-1 w-full'></div>
  <h5> { currentUser.predField === "INFORMATION-TECHNOLOGY" ? "IT" : currentUser.predField } </h5> 
</div>
<div className='h-32 min-w-80 max-w-[500px] bg-[#0074E8] px-4 pt-6 underline-offset-4 flex-grow-0 '>
  <h6 className='underline'>Recommended post/</h6>
  <div className='h-1 w-full'></div>
  <h5> {currentUser.recJob} </h5>
</div>
</div>
  ) : ''
}
{/* Recommended */}

<div className='h-11 w-full'></div>
{recJobs.length > 0 && (
  <>
  <h2 className='font-bold text-[#0B1016]'>Recommended jobs </h2>
  <div className='h-6 w-full'></div>
  </>
)}

{/* Post */}
{
  recJobs.length > 0 ? (
    recJobs.map(job => (
      <div  key={job.id} className="" >
      <div className='h-32 w-full flex items-center  justify-between px-10  bg-[#ECE4DB] rounded-md text-[#0B1016]'>

      {/* First part */}
<div className='flex items-center justify-between  w-full'>
<div className='h-full py-3 flex flex-col justify-center items-start  cursor-pointer ' onClick={() => navigate(`/${job.id}`)}>
    <h4 className='font-bold'>{job.name} </h4>
    <div className='h-2 w-full'></div>
    <div className='flex gap-x-1'>
    <h6 className='flex gap-x-3'>
  {job.keywords !== null ? (
    <>
      {job.keywords.slice(0, 21).split(",").map((word) => (
        <p key={word}
        className="bg-white text-black rounded-lg flex items-center justify-center min-w-14 px-3 h-6 font-semibold"
        >{word}</p>
      ))}
    </>
  ) : (
    "None"
  )}
</h6>

    </div>
    </div>
      {/* First part */}
      <h5 className='flex items-center justify-center px-2'>Posted {job.relativeTime}</h5>
</div>
<div className='h-2 w-6'></div>


      <form onSubmit={applyJob}>
        <input type='hidden' name="userId" value={user.id} />
        <input type='hidden' name="jobId" value={job.id} />
      <button type='submit' className={`text-2xl w-32  h-10  bg-[#1F2232] text-[#F6FAFD] rounded-md   ${myApps.some(myApp => Number(myApp.jobId) === Number(job.id)) ? 'hidden' : ''}`}
        >Apply</button>
      </form>
    </div>
    <div className='h-3 w-full'></div>
      </div>
    
    ))) : ''

}
{/* Post */}





<div className='h-11 w-full'></div>

{/* Resume upload */}
<div className='bg-[#0B1016] text-[#E7EAEF] pt-3 pl-3 '>
<button className='flex items-end' onClick={()=>setVisibleForm(!visibleForm)}><h2 className=" self-start font-bold">Upload resume</h2>
</button>
<div className='h-6 w-full '></div>
</div>
{
  visibleForm && (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full h-48 bg-[#0B1016] text-[#E7EAEF] rounded-b-md px-3'>
      <div className='h-1 w-full '></div>


    <label
    htmlFor='uploadResume'
    className='cursor-pointer w-[280px] h-12  flex items-center justify-center  bg-[#ECE4DB] text-[#0B1016] rounded-md'
    >
    <h5>  {selectedFile || currentUser.resumeLink ? "Change" : "Upload"} resume</h5>
    </label>
    <div className='w-1 h-2'></div>
    {selectedFile && <button type="submit" className='w-[280px] h-12 border-2 bg-blue-500 border-black text-white'><h5>Upload</h5></button> }
                      <input id="uploadResume" type="file" name="resumeLink" onChange={handleFileChange} className='hidden'/>
                      <input type='hidden' value={user.id} name="userId" />
    
          </form>
  )
}

      <div className='h-6 w-full  '></div>

      {/* Resume upload */}



      <h2 className='font-bold text-[#0B1016]'>Latest jobs </h2>
      <div className='h-6 w-full  '></div>
      {/* Post */}
{jobs.map(job => (
  <div  key={job.id} className=''>
  <div className='h-32 w-full flex items-center  justify-between px-10  bg-[#ECE4DB] rounded-md text-[#0B1016] ' >
  {/* First part */}


  <div className='flex items-center justify-between  w-full'>
  <div className='h-full py-3 flex flex-col justify-center items-start  cursor-pointer' onClick={() => navigate(`/${job.id}`)}>
<h4 className='font-bold'>{job.name} </h4>
<div className='h-2 w-full'></div>
<div className='flex gap-x-1'>
<h6 className='flex gap-x-3'>
  {job.keywords !== null ? (
    <>
      {job.keywords.slice(0, 21).split(",").map((word) => (
        <p key={word}
        className="bg-white text-black rounded-lg flex items-center justify-center min-w-14 px-3 h-6 font-semibold"
        >{word}</p>
      ))}
    </>
  ) : (
    "None"
  )}
</h6>
</div>
</div>
  <h5 className='flex items-center justify-center px-2 '>Posted {job.relativeTime}</h5>
</div>
<div className='h-2 w-6'></div>

  {/* First part */}

  <form onSubmit={applyJob}>
    <input type='hidden' name="userId" value={user.id} />
    <input type='hidden' name="jobId" value={job.id} />
{currentUser.resumeLink && (
    <button type='submit' className={`text-2xl w-32  h-10  bg-[#1F2232] text-[#F6FAFD] rounded-md ${myApps.some(myApp => Number(myApp.jobId) === Number(job.id)) ? 'hidden' : ''}`}
    >Apply</button>
)}
  </form>
</div>
<div className='h-3 w-full'></div>
  </div>

))}

{/* Post */}

      {/* <Link to="/hr">HR</Link> */}

            </div>
                        {/* MAIN */}
                        <div className='h-24 w-full '></div>

          </div>
                    // USER EXISTS

        )}

        {!user && 
            <div>
  
Error



            </div>
            }
      </body>
)}
    </html>
  );
  
};

export default Home;