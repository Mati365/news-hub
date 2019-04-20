import express from 'express';
import path from 'path';
import consola from 'consola';

import * as Services from './services';

const app = express();

(async () => {
  // mount routes
  app
    // mount assets provider
    .use(
      '/public',
      express.static(path.join(__dirname, 'public')),
    );

  // mount services
  app
    .use('/api', Services.api)
    .use('*', Services.react);

  // start whole server
  const port = process.env.APP_PORT || 3000;
  consola.info(`Listen at port ${port}!`);

  app.listen(port);
})();
