import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../src/App.css";
import { Link, useParams } from 'react-router-dom';

import { UserContext } from './UserContext';

// ------------
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

// ------------


const AppDetails = () => {

  let { appId } = useParams();
  console.log(appId);

  const [jobDetails, setJobDetails] = useState([]);


  const {user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({});
  const [allApps, setAllApps] = useState([]);

  //----------------------------------------------------------------
    const [matchingScores, setMatchingScores] = useState([]); // List of matching scores
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 
  //----------------------------------------------------------------


  


// THIS JOB DETAILS
  useEffect(() => {
    axios.get(`http://localhost:3000/jobs/${appId}`).then((response) => {
      setJobDetails(response.data);
      console.log(response.data);
    }); 


    // CANDIDATES
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


  let myApps = allApps.filter(app => Number(app.userId) === Number(user.id) );
  console.log(myApps);

  let thisJobApps = allApps.filter(app => Number(app.jobId) === Number(appId) );
  console.log(thisJobApps);

  let resumes = thisJobApps.map(app => app.candidate.resumeLink);
  console.log("resumes", resumes);

  console.log("jobDetails", jobDetails);






  //----------------------------------------------------------------
  const handleScoring = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch("http://127.0.0.1:5000/matching-resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: jobDetails.description, resumes }),
      });

      const result = await response.json(); 
      console.log(result); 

      if (response.ok) {
        const transformedScores =
          result.scores?.map((score, index) => ({
            filename: result.filenames?.[index] || `Fichier ${index + 1}`, 
            score: score || 0, 
          })) || [];

        setMatchingScores(transformedScores);
        setError(""); 
      } else {
        setError(result.error || "Une erreur est survenue lors du traitement.");
      }
    } catch (err) {
      setError("Erreur de connexion avec le serveur Flask."); 
    } finally {
      setLoading(false); 
    }
  };



//---------------------- BeforeJobDesc ---------------------------------------------------------------------------------

function extractBeforeKeyResponsibilities(jobDesc) {
  // Regex to match everything before "Key Responsibilities"
  const match = jobDesc.match(/(.*?)(?=\s*Key Responsibilities:)/s);

  return match ? match[1].trim() : "Not found";
}

const jobDesc = String(jobDetails.description);

console.log(extractBeforeKeyResponsibilities(jobDesc));
let beforeKeyResponsibilities = extractBeforeKeyResponsibilities(jobDesc);

//---------- extract part between Key Responsibilities and Qualifications --------

function extractResponsibilities(jobDesc) {
  // Regex to extract the content between "Key Responsibilities" and "Qualifications"
  const match = jobDesc.match(/(?<=Key Responsibilities:)(.*?)(?=Qualifications:)/s);

  return match ? match[1].trim() : "Not found";
}


console.log(extractResponsibilities(jobDesc));

let keyResponsibilities = extractResponsibilities(jobDesc);


// ---------------- Responsibilities' formatted points  --------------------------------------

function formatResponsibilities(jobDesc) {
  // Split the responsibilities by "- ", trim each item, and filter out empty strings
  return jobDesc
    .split("- ")
    .map(item => item.trim())
    .filter(item => item !== ""); // Remove empty items
}



let responsibilitiesList = formatResponsibilities(keyResponsibilities);

console.log(responsibilitiesList);


// ------------------------------Qualifications' formatted points ------------------------------------------

function extractQualifications(jobDesc) {
  // Regex to extract the content between "Qualifications" and the end of the description
  const match = jobDesc.match(/(?<=Qualifications:)(.*)$/s);

  if (match) {
    const qualificationsText = match[1];

    const qualificationsList = qualificationsText
      .split("- ")
      .map(item => item.trim())
      .filter(item => item !== ""); 
    return qualificationsList;
  }

  return []; // Return empty list if not found
}

const qualificationsList = extractQualifications(jobDesc);

console.log(qualificationsList);

//------------------------------------------



function formatText(text) {
  return text
    .split(". ") // Split at each period followed by a space
    .filter(sentence => sentence.trim() !== "") // Remove empty strings
    .map(sentence => sentence.trim() + ".") // Add the period back
    .join("\n"); // Join with a new line
}


beforeKeyResponsibilities = formatText(beforeKeyResponsibilities);






return (
  <body className=" flex flex-col px-20 font-inter bg-[#ECE4DB] overflow-hidden min-w-screen min-h-screen">
    <div className="bg-[#ECE4DB] text-black">
      <div className="text-xs h-6 "></div>

      {/* Welcome */}
      {/* Welcome */}

      {/* ------------------------------------------------------ */}
      {/* MAIN */}
      <div className="">
        <div className="h-14 w-full flex items-end justify-end  ">
          <Link to={currentUser.isHr ? "/hr" : "/candidate"} className="w-24 h-9 rounded-2xl border-2 border-black flex items-center justify-center gap-x-1 ">
            <h6>Back</h6>
            <img src="left.png" className={`rotate-180 w-4 h-5 `} />
          </Link>
        </div>

        {/* job's details */}
        <div className="flex flex-col items-start justify-center min-h-80 rounded-md bg-[#ECE4DB] ">
          <div className="h-full  w-full">
          <h2 className="font-bold">{jobDetails.name}</h2>
          <div className='w-full h-2'></div>
          <div className='flex w-full gap-x-2'>
<h6 className='font-bold'>Posted by: </h6>
  {/* <h6>{jobDetails.poster.fullName || ''} </h6>  */}
 <h6> {jobDetails.company || 'Unknown'} </h6>
</div>
<div className='w-full h-4'></div>


<div className='w-full flex flex-col justify-between items-start gap-2'>
<div className='flex items-center gap-x-2'>
<IoIosTime />
 <h6 className=' '>Posted {jobDetails.relativeTime} </h6>
</div>
<div className='flex items-center gap-x-2'>
<FaLocationDot />
<h6 className=''> {jobDetails.company_location} </h6>
</div>
<div className='flex items-center gap-x-2'>
<MdWork />
<h6 className=''> {jobDetails.company_jobType} </h6>
</div>
</div>


            <div className="h-4 w-full"></div>
            {/* <h6>{jobDetails.description}</h6>        min-h-80 */}
            {/* <h6>{jobDetails.description}</h6> */}
            <h6 className='flex flex-col gap-y-2'>
            <h6 className='flex flex-col gap-y-1'> 
              {beforeKeyResponsibilities}
              </h6>
              <b>Key Responsibilities:</b>
              {responsibilitiesList.map(one => (
              <div key={one}>- {one}</div>)
              )}
              <b>Qualificationss:</b>
              {qualificationsList.map(one => (
              <div key={one}>- {one}</div>
            )) }
            </h6>
        
        
<div className='h-8 w-full'></div>
<div className='gap-x-1'>
<h6 className="flex gap-x-3">
  {jobDetails?.keywords
    ? jobDetails.keywords.split(",").map((word) => (
        <p
          key={word.trim()}
          className="bg-white text-black rounded-lg flex items-center justify-center min-w-28 px-3 h-9 font-semibold"
        >
          {word.trim()}
        </p>
      ))
    : "None"}
</h6>

</div>
<div className='h-5 w-full'></div>


</div>

<div className='flex items-center justify-center w-full sticky bottom-0' >
<form onSubmit={applyJob} className=''>
        <input type='hidden' name="userId" value={currentUser.id} />
        <input type='hidden' name="jobId" value={appId} />
  {currentUser.resumeLink && (
          <button type='submit' className={`hover:bg-blue-600 flex  items-center justify-center  w-48 h-12  bg-[#1F2232] text-[#F6FAFD] rounded-3xl  fixed bottom-5 left-1/2 transform -translate-x-1/2  ${myApps.some(myApp => Number(myApp.jobId) === Number(appId)) ? 'hidden' : ''}`}
          >
            <p className='text-2xl'>Apply</p>
            {/* <FaExternalLinkAlt className='w-4 h-4' /> */}
          </button>
  )}
      </form>

</div>

</div>
{/* job's details */}

<div className='h-5 w-full'></div>
{currentUser.isHr && (
  <h2 className='font-bold'>Applications </h2>
)}
<div className='h-6 w-full  '></div>

{/* APPLICATIONS */}
{
currentUser.isHr && (
  thisJobApps.map((app, i) => (
    <div key={i}>
<div className='h-20 w-full  flex items-center justify-start gap-x-44 px-8  bg-white rounded-md text-[#0B1016]'>
<div className='w-1/2 flex items-center gap-x-3'>
<h2 className='font-bold '> {i+1} # </h2>
<h4 className=''> {app.candidate.username} </h4>
</div>
<div className='flex w-1/2 justify-between'>
<h5 className=''> {app.score ? 'Score: ' + app.score + '/10' : ''}</h5>
  <div className='flex gap-x-5 '>
    <button className='text-xl w-40  h-10  bg-[#1F2232] text-[#F6FAFD] rounded-md' onClick={() => {
      if(app.candidate.resumeLink) {
        window.open(app.candidate.resumeLink, '_blank')
      }
      else {
        alert("No resume");
      }
    } }>View resume</button>

  </div>
</div>
</div>

<div className='h-3 w-full'></div>
</div>
  ))
)
}

{/* APPLICATIONS */}





            </div>

                        <div className='h-24 w-full '></div>

          </div>


      </body>
    );
};
    
export default AppDetails;