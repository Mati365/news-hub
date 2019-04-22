import consola from 'consola';

import {ExternalWebsiteMetaDescriptor} from '@db/models';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import fetchURLArticleMeta, {metaInfoToArticle} from './utils/fetchURLArticleMeta';

/**
 * @see
 *  H4ckers killer
 */
const crawlerRoute = wrapAsyncRoute(async (req, res) => {
  const {url} = req.query;
  if (!url) {
    res
      .status(400)
      .json(
        {
          error: 'Missing URL get param!',
        },
      );
    return;
  }

  // todo: Add createdAt timestamp check, if low reject
  const cached = await ExternalWebsiteMetaDescriptor
    .query()
    .findOne('websiteUrl', url);

  if (cached) {
    consola.info(`linkCrawler: dump db value for ${url}!`);

    res
      .status(200)
      .json(
        {
          meta: cached,
          article: metaInfoToArticle(cached),
        },
      );

    return;
  }

  // fetching from external server
  const info = await fetchURLArticleMeta(url);
  if (info.empty) {
    res
      .status(406)
      .json(
        {
          error: 'Page without basic info!',
        },
      );
    return;
  }

  await ExternalWebsiteMetaDescriptor
    .query()
    .insert(info.meta);

  res
    .status(200)
    .json(info);
});

export default crawlerRoute;
