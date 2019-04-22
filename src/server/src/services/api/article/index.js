import express from 'express';

import crawlerRoute from './crawlerRoute';
import createArticleRoute from './createArticleRoute';

const articleRouter = express.Router();

articleRouter
  .post('/', createArticleRoute)
  .get('/link-crawler', crawlerRoute);

export default articleRouter;
