import express from 'express';
import { connectToDb, dbName } from './src/api/databases/connection';
import { jobRouter } from './src/api/routes/jobs';
import { userRouter } from './src/api/routes/users';

connectToDb()
  .then(() => {
    const app = express();
    const port: string = process.env.port || '4200';
    const router = express.Router();

    router.use((req, res, next) => {
      res.header('Access-Control-Allow-Methods', 'GET');
      next();
    });

    router.get('/health', (req, res) => {
      const data = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date(),
      };
      res.status(200).send(data);
    });

    var cors = require('cors');
    app.use(cors());
    app.use(express.json());

    app.use(router);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/jobs', jobRouter);

    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(JSON.stringify('Erorr connecting to db', error));
    process.exit();
  });
