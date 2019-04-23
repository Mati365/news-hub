import express from 'express';
import * as R from 'ramda';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import convertArticleMarkdown from '@client/core/helpers/convertArticleMarkdown';

import {Article} from '@db/models';

import crawlerRoute from './crawlerRoute';
import createArticleRoute from './createArticleRoute';
import updateArticleRoute from './updateArticleRoute';

/**
 * @params {Boolean}  markdown
 */
const articleRoute = wrapAsyncRoute(async (req, res) => {
  const article = await Article
    .query()
    .eager('[tags(defaultSelects), externalMetaDescriptor]')
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
      (
        req.query.markdown
          ? R.identity
          : convertArticleMarkdown
      )(article.toJSON()),
    );
});

export default express.Router()
  .post('/', createArticleRoute)
  .patch('/', updateArticleRoute)
  .get('/link-crawler', crawlerRoute)
  .get('/:id', articleRoute);
