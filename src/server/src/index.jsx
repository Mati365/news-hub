import express from 'express';
import path from 'path';
import consola from 'consola';
import cookieParser from 'cookie-parser';

// polyfill
import 'isomorphic-fetch';

import * as Services from './services';
import bootstrapKnexModels from './db/bootstrapKnexModels';

const app = express();

const errorHandler = (err, req, res, next) => {
  if (err.stack) {
    consola.error(err.stack);

    res
      .status(500)
      .json(
        {
          error: (
            process.env.NODE_ENV === 'development'
              ? err.stack
              : 'Error :('
          ),
        },
      );
  } else
    next();
};

(async () => {
  // Loads models
  bootstrapKnexModels();

  // mount routes
  app
    // mount assets provider
    .use(
      '/public',
      express.static(path.join(__dirname, 'public')),
    );

  // mount services
  app
    .use(cookieParser())
    .use('/api', Services.api)
    .use('/', Services.react)
    .use(errorHandler);

  // start whole server
  const port = process.env.APP_PORT || 3000;
  consola.info(`Listen at port ${port}!`);

  app.listen(port);
})();
