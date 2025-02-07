const { Router } = require('express');
const jobsRouter = Router();
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const prisma = new PrismaClient();

const { formatDistanceToNow } = require('date-fns');
// npm i date-fns

jobsRouter.get('/', async (req, res) => {
    let result = await prisma.jobs.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
    const formattedJobs = result.map(job => ({
        ...job,
        relativeTime: `${formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}`,
      }));

    res.json(formattedJobs);
});


jobsRouter.get('/candApps', async (req, res) => {
  let result = await prisma.jobsApps.findMany({
    select: {
      userId: true,
      jobId: true,
      score: true,
      candidate:{
        select: {
          username: true,
          resumeLink: true,
        }
      }
    },
  });

  res.json(result);
});


jobsRouter.get('/:jobId', async (req, res) => {
  const jobId = Number(req.params.jobId);

  const result = await prisma.jobs.findUnique({
    where: { id: jobId },
    include: {
      poster: {
        select: { fullName: true },
      },
    },
  });

  if (!result) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const formattedJob = {
    ...result,
    relativeTime: formatDistanceToNow(new Date(result.createdAt), { addSuffix: true }),
    poster: result.poster ? result.poster : { fullName: 'Unknown Poster' },
  };

  res.json(formattedJob);
});


module.exports = jobsRouter;