import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../src/App.css";
import { UserContext } from './UserContext';
// import Typewriter from "typewriter-effect";




const HRHome = () => {
  const {user, removeToken} = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({});
  const [myJobs, setMyJobs] = useState([]);
  const navigate = useNavigate();
  const [jobKeywords, setJobKeywords] = useState(["HTML", "CSS", "JavaScript"]);
  //-------------------
  const [jobDescription, setJobDescription] = useState(""); 
  const [matchingScores, setMatchingScores] = useState([]); 
	const [error, setError] = useState(""); 
	const [loading, setLoading] = useState(false); 
  const [extractedSkills, setExtractedSkills] = useState(""); 
	const [selectedSkill, setSelectedSkill] = useState(""); 
  //-------------------
 const [showMore0, setShowMore0 ] = useState(false);
 const [showMore1, setShowMore1 ] = useState(false);


console.log(user);


useEffect(() => {
  axios.get(`http://localhost:3000/users/myJobs/${currentUser.id}`).then(response => {
    setMyJobs(response.data);
    console.log(response.data);
  });
}, [currentUser.id]);



useEffect(() => {
  if (user?.id) {
    axios.get(`http://localhost:3000/users/${user.id}`).then((response) => {
      setCurrentUser(response.data);
      console.log("userDetails", response.data);
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }
}, [user?.id]); 

    // --------------------------------------------------------
    const addJob = async (e) => {
      e.preventDefault();
    
      const jobName = e.target.jobName.value;
      const jobDesc = e.target.jobDesc.value;
      const userId = e.target.userId.value;
      const companyTitle = e.target.companyTitle.value;
      // const keywords = jobKeywords.join(', ') + ", " + e.target.extraKeywords.value;
    const keywords = extractedSkills;
    
      try {
        const response = await axios.post('http://localhost:3000/users/addJob', {
          jobName,
          jobDesc,
          userId,
          companyTitle,
          keywords,
        }, {
          headers: { 'Content-Type': 'application/json' }, 
        });
    
        console.log(response.data);
      } catch (error) {
        console.error('Error adding job:', error);
      }

      window.location.reload();
    };

    console.log(myJobs);
  


    //----------------------------------------------------------------
    const handleScoring = async (e) => {
      e.preventDefault(); // Empêcher le rechargement de la page
      setLoading(true); // Démarrer le chargement
  
      try {
        const response = await fetch("http://127.0.0.1:5000/matching-resumes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: jobDescription }),
        });
  
        const result = await response.json(); // Récupérer la réponse JSON
        console.log(result); // Afficher la réponse dans la console pour inspecter les données
  
        if (response.ok) {
          // Si la réponse est correcte, mettre à jour les scores de matching
          const transformedScores =
            result.scores?.map((score, index) => ({
              filename: result.filenames?.[index] || `Fichier ${index + 1}`, // Dynamique ou par défaut
              score: score || 0, // Ajouter une valeur par défaut pour le score
            })) || [];
  
          setMatchingScores(transformedScores);
          setError(""); // Réinitialiser les erreurs
        } else {
          setError(result.error || "Une erreur est survenue lors du traitement.");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Erreur de connexion avec le serveur Flask."); // Erreur de connexion
      } finally {
        setLoading(false); // Arrêter le chargement
      }
    };



    	// predefined skills
	const predefinedSkills = [
		"JavaScript",
		"React",
		"Node.js",
		"Python",
		"Machine Learning",
		"Data Science",
		"SQL",
		"Project Management",
		"UI/UX Design",
	];

  let debounceTimer;

  const handleSkillExtraction = (description) => {
    clearTimeout(debounceTimer); // Clear previous timer
    debounceTimer = setTimeout(async () => {
      if (description.trim()) {
        try {
          const response = await fetch("http://127.0.0.1:5000/extract-skills", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ description }), // Send job description to Flask API
          });
  
          const result = await response.json();
          if (response.ok) {
            const skillsString = result.skills.join(", "); // Combine extracted skills
            setExtractedSkills(skillsString);
            setError(""); // Reset error
          } else {
            setError(result.error); 
          }
        } catch (err) {
          setError("Erreur de connexion avec le serveur Flask."); 
        }
      }
    }, 500); // Delay for 500ms
  };
  

	// Fonction pour ajouter la compétence sélectionnée à l'espace de texte
	const handleAddSkill = () => {
		if (selectedSkill && !extractedSkills.includes(selectedSkill)) {
			setExtractedSkills(
				extractedSkills ? `${extractedSkills}, ${selectedSkill}` : selectedSkill
			); // Ajouter la compétence à l'espace de texte
		}
	};
    //----------------------------------------------------------------



  return (
    <html lang="en"> 
      <body className="border-white  bg-[#F6FAFD] border-2 flex flex-col px-40 font-inter">
        {user && (
          // USER EXISTS
          <div className="bg-[#F6FAFD] text-[#1F2232] ">
                    {/* token */}
            <div className='text-white text-xs'>

            <p>Name: {user.username} Id: {user.id} Email: {user.email}</p>

            <p>
              {user.token || localStorage.getItem("jwt_token")}
            </p>
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

{/* Add job */}
<form className='flex flex-col gap-x-5 items-center justify-center bg-[#0B1016] text-[#E7EAEF] rounded-md ' onSubmit={addJob}>
<div className='h-6 w-full'></div>
<h2 className="pl-12 self-start font-bold">Add a new job</h2>
<div className='h-3 w-full'></div>
<div className='h-3 w-full'></div>
<div className='w-full flex flex-col items-start px-12 '>
{/* <label>Job's title</label> */}
<input type="text" name="jobName" className=' h-9 w-96 p-2 bg-transparent border-b-2 border-[#E7EAEF] placeholder-[#E7EAEF]' placeholder="Job's title" />
<div className='h-4 w-full'></div>
{/* px-[400px] */}
{/* <label>Job's description</label> */}
<textarea
  type="text"
  name="jobDesc"
  value={jobDescription}
  onChange={(e) => {
    setJobDescription(e.target.value);
    handleSkillExtraction(e.target.value);
  }}
  className=" w-[1056px] h-80 p-2  bg-transparent border-b-2 border-[#E7EAEF] placeholder-[#E7EAEF]"
  placeholder="Job's description"
/>
<div className="h-4 w-full"></div>


<div className="h-4 w-full"></div>

<div>
  <h5>Extracted Skills:</h5>
  <textarea
    value={extractedSkills}
    readOnly
    className="rounded-lg border-2 border-[#E7EAEF] w-[1056px] h-20 p-2 bg-transparent"
  />
</div>

<div className="h-4 w-full"></div>

<div className=''>
				<label htmlFor='skill-select'><h5>Add a skill:</h5></label>
				<div className='flex items-center bg-transparent text-[#E7EAEF]'>
        <select
					id='skill-select'
          className='h-10 bg-transparent text-[#E7EAEF] border-2 rounded-md border-opacity-20'
					value={selectedSkill}
					onChange={(e) => setSelectedSkill(e.target.value)}>
					<option value=''>-- Select a skill --</option>
					{predefinedSkills.map((skill, index) => (
						<option key={index} value={skill} className='bg-[#0B1016] text-[#E7EAEF]'>
							{skill}
						</option>
					))}
				</select>
        <div className='h-2 w-3'></div>
				<button
					type='button'
          className='w-24 h-10 flex items-center justify-center  bg-[#ECE4DB] text-[#0B1016] text-center rounded-lg '
					onClick={handleAddSkill}
					disabled={!selectedSkill}>
            Add
				</button>
        </div>
			</div>







<div className='h-4 w-full'></div>
<input type='hidden' name="userId" value={user.id} />
<input type='hidden' name="companyTitle" value={currentUser.fullName} />
<div className='h-4 w-full'></div>
<div className='w-full flex justify-center '>
<button type="submit" className='w-72 h-20 bg-[#ECE4DB] text-[#0B1016] rounded-md mb-3 '><h5>Submit</h5></button>


</div>
</div>
</form>
{/* Add job */}

<div className='h-10 w-full'></div>
<div className='w-full flex justify-center border-b-2 border-[#0B1016] '>
<h2 className="font-bold">My jobs</h2>
</div>
<div className='h-6 w-full  '></div>

{/* All posts */}
{
  myJobs.length > 0  && myJobs.slice(0, 5).map((job, i) => (
    <div key={i} className="cursor-pointer" onClick={() => navigate(`/${job.id}`)}>
<div className='h-32 w-full  flex items-center justify-between px-20 bg-[#ECE4DB] rounded-md text-[#0B1016]'>
<h4 className='w-1/2 font-bold'>{job.name} </h4>
  <h5 className='w-1/2 text-end'>Posted {job.relativeTime} </h5>
</div>

<div className='h-3 w-full'></div>
</div>
  ))
}

{/* All posts */}



            </div>
                        {/* MAIN */}





 { !showMore0 && (
  
<div className='h-24 w-full flex items-center justify-center gap-x-4 '>
                          <h6 className='cursor-pointer underline underline-offset-2 ' onClick={() => setShowMore0(true)}> Show more </h6>
                          </div>
 )}

                          {
  myJobs.length > 0 && showMore0 && myJobs.slice(5, 10).map((job, i) => (
    <div key={i} className="cursor-pointer" onClick={() => navigate(`/${job.id}`)}>
<div className='h-32 w-full  flex items-center justify-between px-20 bg-[#ECE4DB] rounded-md text-[#0B1016]'>
<h4 className='w-1/2 font-bold'>{job.name} </h4>
  <h5 className='w-1/2 text-end'>Posted {job.relativeTime} </h5>
</div>

<div className='h-3 w-full'></div>
</div>
  ))
}





{ !showMore1 && showMore0 && (
  
  <div className='h-24 w-full flex items-center justify-center gap-x-4 '>
                            <h6 className='cursor-pointer underline underline-offset-2 ' onClick={() => setShowMore1(true)}> Show more </h6>
                            </div>
   )}
  
                            {
    myJobs.length > 0 && showMore1 && myJobs.slice(10, 15).map((job, i) => (
      <div key={i} className="cursor-pointer" onClick={() => navigate(`/${job.id}`)}>
  <div className='h-32 w-full  flex items-center justify-between px-20 bg-[#ECE4DB] rounded-md text-[#0B1016]'>
  <h4 className='w-1/2 font-bold'>{job.name} </h4>
    <h5 className='w-1/2 text-end'>Posted {job.relativeTime} </h5>
  </div>
  
  <div className='h-3 w-full'></div>
  </div>
    ))
  }








{
  showMore0 && showMore1 && (
    <div className='w-full h-24'></div>
  )
}
          </div>


        )}

        {!user && 
            <div>
  
Error



            </div>
            }
      </body>
    </html>
  );
  
};

export default HRHome;