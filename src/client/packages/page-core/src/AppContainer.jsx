import React from 'react';

import HTMLSkeleton from './containers/HTMLSkeleton';

const AppContainer = props => (
  <HTMLSkeleton {...props} />
);

AppContainer.displayName = 'AppContainer';

export default AppContainer;
