import React from 'react';
import PropTypes from 'prop-types';

const JSONGlobalVariable = ({globalVariableName, data}) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `window['${globalVariableName}'] = ${JSON.stringify(data)};`,
    }}
  />
);

JSONGlobalVariable.displayName = 'JSONGlobalVariable';

JSONGlobalVariable.propTypes = {
  data: PropTypes.any.isRequired,
  globalVariableName: PropTypes.string.isRequired,
};

export default React.memo(JSONGlobalVariable);
