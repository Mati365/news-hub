import express from 'express';
import path from 'path';
import consola from 'consola';

import * as Services from './services';
import appAssetsManifestMiddleware from './middlewares/appAssetsManifestMiddleware';

const app = express();

(async () => {
  // mount routes
  app
    // mount assets provider
    .use(
      '/public',
      express.static(path.join(__dirname, 'public')),
    );

  app

    // mount middlewares shared by services
    .use(appAssetsManifestMiddleware)

    // mount services
    .use('/', Services.react);

  // start whole server
  const port = process.env.APP_PORT || 3000;
  consola.info(`Listen at port ${port}!`);

  app.listen(port);
})();
