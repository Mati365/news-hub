import * as R from 'ramda';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Article} from '@db/models';

const createArticleRoute = wrapAsyncRoute(async (req, res) => {
  const {body: article} = req;

  await Article
    .query()
    .insert(
      {
        userId: res.locals.userMeta.info.id,

        ...R.pick(
          [
            'coverUrl', 'coverTitle', 'title',
            'lead', 'content', 'externalDescriptorId',
          ],
          article,
        ),
      },
    );

  res
    .status(200)
    .json(
      {
        status: 'ok',
      },
    );
});

export default createArticleRoute;
