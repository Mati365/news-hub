import * as R from 'ramda';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {
  Tag,
  Article,
  ArticleTag,
} from '@db/models';

const createArticleRoute = wrapAsyncRoute(async (req, res) => {
  // Insert main article
  const article = await Article
    .query()
    .insert(
      {
        userId: res.locals.userMeta.info.id,

        ...R.pick(
          [
            'coverUrl', 'coverTitle', 'title',
            'lead', 'content', 'externalDescriptorId',
          ],
          req.body,
        ),
      },
    );

  // Insert tags
  for await (const {name: tagName} of req.body.tags) {
    let tag = await Tag
      .query()
      .findOne('name', tagName);

    if (!tag) {
      tag = await Tag
        .query()
        .insert(
          {
            name: tagName,
          },
        );
    }

    await ArticleTag
      .query()
      .insert(
        {
          tagId: tag.id,
          articleId: article.id,
        },
      );
  }

  res
    .status(200)
    .json(
      {
        status: 'ok',
      },
    );
});

export default createArticleRoute;
