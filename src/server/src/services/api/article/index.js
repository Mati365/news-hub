import express from 'express';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Article} from '@db/models';

import crawlerRoute from './crawlerRoute';
import createArticleRoute from './createArticleRoute';
import convertArticleMarkdown from './utils/convertArticleMarkdown';

const articleRoute = wrapAsyncRoute(async (req, res) => {
  const article = await Article
    .query()
    .eager('tags(defaultSelects)')
    .findById(req.params.id);

  if (!article) {
    res
      .status(404)
      .json(
        {
          error: 'Not found',
        },
      );
    return;
  }

  res
    .status(200)
    .json(
      convertArticleMarkdown(article.toJSON()),
    );
});

export default express.Router()
  .post('/', createArticleRoute)
  .get('/link-crawler', crawlerRoute)
  .get('/:id', articleRoute);
