import express from 'express';

import authRouter from './auth';
import articlesRouter from './articles';

const apiRouter = express.Router();

apiRouter
  .use(express.json())
  .use('/auth', authRouter)
  .use('/articles', articlesRouter)
  .get('*', (req, res) => {
    res.json(
      {
        error: 'Not found!',
        status: 404,
      },
    );
  });

export default apiRouter;
