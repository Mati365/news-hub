import express from 'express';

import {authJWTUserMiddleware} from './middlewares';

import authRouter from './auth';
import articlesRouter from './articles';
import articleRouter from './article';

const apiRouter = express.Router();

apiRouter
  .use(express.json())

  .use('/auth', authRouter)
  .use('/article', authJWTUserMiddleware, articleRouter)
  .use('/articles', authJWTUserMiddleware, articlesRouter)
  .get('*', (req, res) => {
    res.json(
      {
        error: 'Not found!',
        status: 404,
      },
    );
  });

export default apiRouter;
