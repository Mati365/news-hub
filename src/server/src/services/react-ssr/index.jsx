import React from 'react';
import express from 'express';
import * as R from 'ramda';

import ssrRenderStyledComponent from '@jss/server/ssrRenderStyles';
import memoizeOne from '@utils/helpers/cache/memoizeOne';

import AppRoot from '@client/layout';

import authJWTUserMiddleware from '../api/middlewares/authJWTUserMiddleware';
import {
  appAssetsManifestMiddleware,
  assignI18nPackMiddleware,
} from './middlewares';

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

  const context = {};
  const prerendered = ssrRenderStyledComponent(
    <AppRoot
      hydrationData={hydrationData}
      ssrRouterProps={{
        location: req.url,
        context,
      }}
    />,
  );

  if (context.url)
    res.redirect(302, context.url);
  else
    res.send(`<!doctype html>${prerendered}`);
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
