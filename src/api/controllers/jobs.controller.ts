import { Request, Response } from 'express';
import { GetJobRequest } from '../../models/jobs.interface';
import { JobDatabase } from '../databases/Jobs';

export async function getAllJobs(req: Request, res: Response) {
  const client = new JobDatabase();
  try {
    const request: GetJobRequest = req.body;
    const result = await client.getJobs(request);
    if (result && result.length) {
      res.status(200).send({
        message: 'Successfully retrieved jobs.',
        success: true,
        data: result,
      });
    } else {
      res.status(404).send({
        message: 'No jobs found.',
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'A server side error ocurred. Please try again.',
      success: false,
      erorr: error,
      query: req.query,
    });
  }
}
