import * as R from 'ramda';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Article} from '@db/models';

import stripArticleHTML from './utils/stripArticleHTML';

export const pickArticleReqData = (req, res) => R.compose(
  R.assoc(
    'userId',
    res.locals.userMeta.info.id,
  ),
  stripArticleHTML,
  R.pick(
    [
      'id', 'coverUrl', 'coverTitle', 'title',
      'lead', 'content', 'externalDescriptorId',
    ],
  ),
)(req.body);

const createArticleRoute = wrapAsyncRoute(async (req, res) => {
  // Insert main article
  await Article
    .query()
    .insert(
      pickArticleReqData(req, res),
    )
    .$insertTags(req.body.tags || []);

  res
    .status(200)
    .json(
      {
        status: 'ok',
      },
    );
});

export default createArticleRoute;
