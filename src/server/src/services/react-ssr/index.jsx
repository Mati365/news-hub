import React from 'react';
import express from 'express';
import * as R from 'ramda';

import {MAGIC_ASYNC_DATA_CONTEXT} from '@async-resolver/wrapAsyncTree';

import ssrRenderStyledComponent from '@jss/server/ssrRenderStyles';
import ssrRenderAsyncTree, {createBlankAsyncContext} from '@async-resolver/ssrRenderAsyncTree';

import memoizeOne from '@utils/helpers/cache/memoizeOne';

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

const rootRoute = (req, res) => {
  const {manifest} = res.locals;
  const hydrationData = {
    scripts: pickMainScripts(manifest),
    data: {
      i18n: res.locals.i18n,
    },
  };

  const asyncContext = createBlankAsyncContext();

  for (let i = 0; i < 3; ++i) {
    const context = {};
    const prerendered = composedSsrRenderer(asyncContext)(
      <AppRoot
        hydrationData={{
          ...hydrationData,
          [MAGIC_ASYNC_DATA_CONTEXT]: asyncContext.cache,
        }}
        ssrRouterProps={{
          location: req.url,
          context,
        }}
      />,
    );

    if (context.url) {
      res.redirect(302, context.url);
      break;
    }

    if (R.isEmpty(asyncContext.promises)) {
      res.send(`<!doctype html>${prerendered}`);
      break;
    }
  }
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
    appAssetsManifestMiddleware,
    assignI18nPackMiddleware,

    // DB/API middlewares
    authJWTUserMiddleware,
  )

  .get('*', rootRoute);

export default router;
