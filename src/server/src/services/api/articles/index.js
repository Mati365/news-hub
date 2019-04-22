import express from 'express';
import * as R from 'ramda';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Article} from '@db/models';

import convertArticleMarkdown from '../article/utils/convertArticleMarkdown';

const articlesRouter = express.Router();

/**
 * @param {Number}  limit
 */
const articlesRoute = wrapAsyncRoute(async (req, res) => {
  const {limit = 5} = req.query;

  const articles = await Article
    .query()
    .eager('tags(defaultSelects)')
    .orderBy('createdAt', 'DESC')
    .limit(limit);

  res
    .status(200)
    .json(
      R.map(
        article => convertArticleMarkdown(article.toJSON()),
        articles,
      ),
    );
});

articlesRouter
  .get('/', articlesRoute);

export default articlesRouter;
