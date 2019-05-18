import express from 'express';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Article} from '@db/models';

/**
 * @param {Number}  id
 */
const searchRoute = wrapAsyncRoute(async (req, res) => {
  const {phrase, limit} = req.query;
  if (!phrase) {
    res
      .status(400)
      .json(
        {
          error: 'Missing phrase!',
        },
      );
    return;
  }

  const articles = await Article
    .query()
    .$search(
      {
        phrase,
        limit: limit || 20,
      },
    );

  res.json(
    {
      articles,
    },
  );
});

export default express
  .Router()
  .get('/', searchRoute);
