import express from 'express';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Tag} from '@db/models';

/**
 * @param {Number}  id
 */
const tagRoute = wrapAsyncRoute(async (req, res) => {
  const tag = await Tag
    .query()
    .findById(req.params.id);

  if (tag) {
    res
      .status(200)
      .json(tag);
  } else {
    res
      .status(404)
      .json(
        {
          error: 'Not found',
        },
      );
  }
});

export default express
  .Router()
  .get('/:id', tagRoute);
