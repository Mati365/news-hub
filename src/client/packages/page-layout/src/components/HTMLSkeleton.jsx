import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {
  ROOT_HYDRATION_CONTAINER,
  GLOBAL_HYDRATION_VARIABLE,
} from '@constants/globalAccessors';

import JSONGlobalVariable from './JSONGlobalVariable';

const renderScripts = R.map(
  scriptUrl => <script key={scriptUrl} src={scriptUrl} />,
);

const HTMLSkeleton = ({head, children, hydrationData: {data, scripts}}) => (
  <html lang='pl'>
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {head}
    </head>

    <body>
      <main id={ROOT_HYDRATION_CONTAINER}>
        {children}
      </main>

      {data && (
        <JSONGlobalVariable
          globalVariableName={GLOBAL_HYDRATION_VARIABLE}
          data={data}
        />
      )}

      {scripts && renderScripts(scripts)}
    </body>
  </html>
);

HTMLSkeleton.displayName = 'HTMLSkeleton';

HTMLSkeleton.propTypes = {
  head: PropTypes.node,
  hydrationData: PropTypes.shape(
    {
      scripts: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.any,
    },
  ),
};

HTMLSkeleton.defaultProps = {
  head: null,
  hydrationData: {
    scripts: [],
    data: {},
  },
};

export default HTMLSkeleton;
