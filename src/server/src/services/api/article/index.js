import express from 'express';
import consola from 'consola';

import {ExternalWebsiteMetaDescriptor} from '@db/models';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import fetchURLArticleMeta, {tokenizeKeywords} from './utils/fetchURLArticleMeta';

const articleRouter = express.Router();

articleRouter
  // do not allow server to download GBs of data!
  // limit it!
  // todo: Prevent h4cks
  .get('/link-crawler', wrapAsyncRoute(async (req, res) => {
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
            url: cached.websiteUrl,
            title: cached.metaTitle,
            description: cached.metaDescription,
            keywords: tokenizeKeywords(cached.metaKeywords),
            textKeywords: cached.metaKeywords,
          },
        );

      return;
    }

    // fetching from external server
    const info = await fetchURLArticleMeta(url);
    if (!info.title && !info.description) {
      res
        .status(406)
        .json(
          {
            error: 'Page without info!',
          },
        );
      return;
    }

    await ExternalWebsiteMetaDescriptor
      .query()
      .insert(
        {
          websiteUrl: info.url,
          metaTitle: info.title,
          metaDescription: info.description,
          metaKeywords: info.textKeywords,
        },
      );

    res
      .status(200)
      .json(info);
  }));

export default articleRouter;
