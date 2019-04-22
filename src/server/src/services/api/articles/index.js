import express from 'express';
import * as R from 'ramda';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {
  ArticleTag,
  Article,
} from '@db/models';

import convertArticleMarkdown from '../article/utils/convertArticleMarkdown';

const articlesRouter = express.Router();

/**
 * @param {Number}  limit
 * @param {String[]} tags
 */
const articlesRoute = wrapAsyncRoute(async (req, res) => {
  const {
    limit = 5,
    tags = null,
  } = req.query;

  const query = Article
    .query()
    .eager('tags(defaultSelects)')
    .orderBy('createdAt', 'DESC');

  if (tags)
    query.$withTags(tags);

  query
    .limit(limit);

  const articles = await query;
  res
    .status(200)
    .json(
      R.map(
        article => convertArticleMarkdown(article.toJSON()),
        articles,
      ),
    );
});

/**
 * @param {Number}  tagsLimit
 */
const tagsPopularArticlesRoute = wrapAsyncRoute(async (req, res) => {
  const {
    tagsLimit = 3,
    articlesLimit = 4,
  } = req.query;

  const popularTags = await ArticleTag
    .query()
    .$popularTags()
    .limit(tagsLimit);

  const articles = await Promise.all(
    R.map(
      async ({tag}) => ({
        tag,
        articles: R.map(
          r => r.toJSON(),
          await Article
            .query()
            .$withTags([tag.id])
            .orderBy('createdAt')
            .limit(articlesLimit),
        ),
      }),
      popularTags,
    ),
  );

  res
    .status(200)
    .json(articles);
});

articlesRouter
  .get('/popular-by-tags', tagsPopularArticlesRoute)
  .get('/', articlesRoute);

export default articlesRouter;
