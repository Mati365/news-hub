import React from 'react';
import PropTypes from 'prop-types';

const HTMLSkeleton = ({head, children}) => (
  <html lang='pl'>
    <head>
      {head}
    </head>

    <body>
      {children}
    </body>
  </html>
);

HTMLSkeleton.displayName = 'HTMLSkeleton';

HTMLSkeleton.propTypes = {
  head: PropTypes.node,
};

HTMLSkeleton.defaultProps = {
  head: null,
};

export default HTMLSkeleton;
