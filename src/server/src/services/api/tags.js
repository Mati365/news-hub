import express from 'express';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {ArticleTag} from '@db/models';

/**
 * @param {Number}  limit
 */
const popularTagsRoute = wrapAsyncRoute(async (req, res) => {
  const {limit = 5} = req.query;

  const popularTags = await ArticleTag
    .query()
    .$popularTags()
    .limit(limit);

  res
    .status(200)
    .json(popularTags);
});

export default express.Router()
  .get('/popular-tags', popularTagsRoute);
