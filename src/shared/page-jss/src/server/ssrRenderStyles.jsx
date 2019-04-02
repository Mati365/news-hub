import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as R from 'ramda';
import {
  JssProvider,
  SheetsRegistry,
} from 'react-jss';

import {MAGIC_JSS_HEAD_TAG} from '../components/MagicJSSHeadTag';

const ssrRenderStyledComponent = (component) => {
  const sheets = new SheetsRegistry;

  const str = ReactDOMServer.renderToString(
    <JssProvider registry={sheets}>
      {component}
    </JssProvider>,
  );

  return R.replace(
    MAGIC_JSS_HEAD_TAG,
    sheets.toString(),
    str,
  );
};

export default ssrRenderStyledComponent;
