import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Article} from '@db/models';

import {pickArticleReqData} from './createArticleRoute';

const updateArticleRoute = wrapAsyncRoute(async (req, res) => {
  const formData = pickArticleReqData(req, res);

  // Find old article
  const article = await Article
    .query()
    .findById(formData.id);

  if (!article) {
    res
      .status(404)
      .json(
        {
          error: 'record not found',
        },
      );
    return;
  }

  // Find new article
  await article
    .$query()
    .patchAndFetch(formData)
    .$patchTags(req.body.tags);

  res
    .status(200)
    .json(
      {
        status: 'ok',
      },
    );
});

export default updateArticleRoute;
