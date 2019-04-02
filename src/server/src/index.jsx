import express from 'express';
import path from 'path';
import consola from 'consola';

import format from '@page/utils/src/helpers/format';

import * as Services from './services';

console.log(format('test %{a} replace', {a: 2}));
console.log(format('%{} %{}', [1, 2]));

const app = express();

(async () => {
  // mount routes
  app
    .use(
      '/public',
      express.static(path.join(__dirname, 'public')),
    )
    .use('/', Services.react);

  // start whole server
  const port = process.env.APP_PORT || 3000;
  consola.info(`Listen at port ${port}!`);

  app.listen(port);
})();
