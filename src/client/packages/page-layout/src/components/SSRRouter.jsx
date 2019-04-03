import {
  BrowserRouter,
  StaticRouter,
} from 'react-router-dom';

import ssr from '@utils/helpers/ssr';

export default (
  ssr
    ? StaticRouter
    : BrowserRouter
);
