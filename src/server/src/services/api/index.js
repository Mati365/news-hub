import express from 'express';

import {authJWTUserMiddleware} from './middlewares';

import authRouter from './auth';
import articlesRouter from './articles';
import articleRouter from './article';
import tagsRouter from './tags';
import tagRouter from './tag';
import searchRouter from './search';

const apiRouter = express.Router();

apiRouter
  .use(express.json())

  .use('/auth', authRouter)
  .use('/tag', tagRouter)
  .use('/tags', tagsRouter)
  .use('/article', authJWTUserMiddleware, articleRouter)
  .use('/articles', authJWTUserMiddleware, articlesRouter)
  .use('/search', searchRouter)
  .get('*', (req, res) => {
    res.json(
      {
        error: 'Not found!',
        status: 404,
      },
    );
  });

export default apiRouter;
