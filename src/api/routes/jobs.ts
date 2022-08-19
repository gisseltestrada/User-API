import { Router } from 'express';
import * as JobController from '../controllers/jobs.controller';

export const jobRouter = Router({
  strict: true,
});

jobRouter.get('/getJobs', JobController.getAllJobs);
