const { Router } = require('express');
const userRouter = Router();
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const prisma = new PrismaClient();

const { formatDistanceToNow } = require('date-fns');


const axios = require('axios');
const FormData = require('form-data'); // Import the form-data package
const { stringify } = require('uuid');



userRouter.get('/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    let result = await prisma.users.findUnique({
        where: {
            id: userId,
        }
    });

    res.json(result);
});



userRouter.post('/apply', async (req, res) => {
    let userId = Number(req.body.userId);
    let jobId = Number(req.body.jobId);

    try {
        // Create a job application entry
        let result = await prisma.jobsApps.create({
            data: {
                jobId: jobId,
                userId: userId,
            },
        });

        // Fetch user's resume link
        let userResume = await prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                resumeLink: true,
            },
        });

        // Fetch job description
        let jobDesc = await prisma.jobs.findUnique({
            where: {
                id: jobId,
            },
            select: {
                description: true,
            },
        });

        const pythonServerURL = 'http://localhost:5000/process-resume';

        // Sending request to Python server
        const formData = new FormData();
        formData.append('jobDescription', jobDesc.description);
        formData.append('resumeLink', userResume.resumeLink);

        const response = await axios.post(pythonServerURL, formData, {
            headers: formData.getHeaders(),
        });

        // Extract the similarity score from the Python server's response
        const score = response.data.resumeSimilarityScore.toString();

        // Find the created job application entry
        let jobApp = await prisma.jobsApps.findFirst({
            where: {
                jobId,
                userId,
            },
        });

        if (!jobApp || !jobApp.id) {
            throw new Error('Job application not found.');
        }

        let jobAppId = jobApp.id;

        // Update the job application with the score
        let finalResult = await prisma.jobsApps.update({
            data: {
                score,
            },
            where: {
                id: jobAppId,
            },
        });

        // Send the final response
        res.json(finalResult);

    } catch (error) {
        console.error('Error applying for the job:', error);
        res.status(500).json({ error: 'Failed to apply for the job' });
    }
});




// ----------HR--------------------------------
userRouter.post('/addJob', async (req, res) => {
    let { jobName , jobDesc, userId, companyTitle, keywords } = req.body;


    let result = await prisma.jobs.create(
        {
            data: {
                name: jobName,
                description: jobDesc,
                postedBy: Number(userId),
                company: companyTitle,
                keywords,
            }
        }
    );

    res.json(result);
});


// GET myJobs of HR
userRouter.get('/myJobs/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    let result = await prisma.jobs.findMany({
        where: {
            postedBy: userId,
        },
        orderBy: {
            id: "desc",
        },
    });

    const formattedJobs = result.map(job => ({
        ...job,
        relativeTime: `${formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}`,
      }));


    res.json(formattedJobs);
});

module.exports = userRouter;