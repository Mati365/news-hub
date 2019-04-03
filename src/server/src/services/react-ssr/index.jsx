import React from 'react';
import express from 'express';
import * as R from 'ramda';

import ssrRenderStyledComponent from '@jss/server/ssrRenderStyles';
import memoizeOne from '@utils/helpers/cache/memoizeOne';

import AppRoot from '@client/layout';

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
  if (!req.accepts('html')) {
    res
      .status(404)
      .json(
        {
          code: 404,
        },
      );
    return;
  }

  const {manifest} = res.locals;
  const hydrationData = {
    scripts: pickMainScripts(manifest),
  };

  const prerendered = ssrRenderStyledComponent(
    <AppRoot hydrationData={hydrationData} />,
  );

  res.send(prerendered);
};

export default (
  express
    .Router({
      strict: true,
    })
    .get('*', rootRoute)
);
