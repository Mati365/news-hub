import React from 'react';
import express from 'express';
import useragent from 'express-useragent';
import * as R from 'ramda';

import {MAGIC_ASYNC_DATA_CONTEXT} from '@async-resolver/wrapHydratedAsyncTree';
import env from '@constants/global/env';

import ssrRenderStyledComponent from '@jss/server/ssrRenderStyles';
import ssrRenderAsyncTree, {createBlankAsyncContext} from '@async-resolver/ssrRenderAsyncTree';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import memoizeOne from '@utils/helpers/cache/memoizeOne';
import mapObjValuesToPromise from '@utils/helpers/async/mapObjValuesToPromise';

import AppRoot from '@client/layout';

import {authJWTUserMiddleware} from '../api/middlewares';
import {
  appAssetsManifestMiddleware,
  assignI18nPackMiddleware,
} from './middlewares';

const composedSsrRenderer = asyncContext => R.compose(
  ssrRenderStyledComponent,
  ssrRenderAsyncTree(asyncContext),
);

/**
 * Cached pick array of script from dynamic loaded manifest,
 * in PRODUCTION env it is the same
 *
 * @param {String[]} scripts
 */
const pickManifestScripts = scripts => memoizeOne(
  R.compose(
    R.values,
    R.pick(scripts),
  ),
);

const pickMainScripts = pickManifestScripts(
  [
    'main.js',
  ],
);

const rootRoute = async (req, res) => {
  const {manifest} = res.locals;
  const {useragent: expressUA} = req;

  const hydrationData = {
    scripts: pickMainScripts(manifest),
    data: {
      ua: {
        mobile: expressUA.isMobile,
        desktop: expressUA.isDesktop,
      },
      i18n: res.locals.i18n,
      env: {
        ...env.shared,
        ...env.client,
      },
    },
  };

  const renderAsync = async (
    asyncContext = createBlankAsyncContext(),
    iteration = 0,
  ) => {
    const context = {};
    const prerendered = composedSsrRenderer(asyncContext)(
      <AppRoot
        hydrationData={{
          ...hydrationData,
          data: {
            ...hydrationData.data,
            [MAGIC_ASYNC_DATA_CONTEXT]: asyncContext.cache,
          },
        }}
        ssrCookiesProps={{
          req,
          res,
        }}
        ssrRouterProps={{
          location: req.url,
          context,
        }}
      />,
    );

    if (context.url)
      res.redirect(302, context.url);
    else if (R.isEmpty(asyncContext.promises) || iteration > 3)
      res.send(`<!doctype html>${prerendered}`);
    else {
      const data = await mapObjValuesToPromise(R.identity, asyncContext.promises);
      await renderAsync(
        {
          promises: {},
          cache: {
            ...asyncContext.cache,
            ...data,
          },
        },
        iteration + 1,
      );
    }
  };

  await renderAsync();
};

// Configure router
const router = express.Router();

router
  .use(
    (req, res, next) => {
      if (
        !req.accepts('text/html')
        // todo: /favicon.ico
          || req.originalUrl === '/favicon.ico'
      ) {
        res
          .status(404)
          .json(
            {
              code: 404,
            },
          );
      } else
        next();
    },

    // Data providers
    appAssetsManifestMiddleware,
    assignI18nPackMiddleware,

    // UA
    useragent.express(),

    // DB/API middlewares
    authJWTUserMiddleware,
  )

  .get('*', wrapAsyncRoute(rootRoute));

export default router;
