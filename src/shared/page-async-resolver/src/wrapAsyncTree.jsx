import React from 'react';

import hydrationData from '@shared/constants/src/global/hydrationData';
import AsyncContextProvider from './AsyncContextProvider';

export const MAGIC_ASYNC_DATA_CONTEXT = 'resolvedPromises';

const wrapAsyncTree = (Component) => {
  const initialCacheStore = {
    cache: hydrationData[MAGIC_ASYNC_DATA_CONTEXT],
  };

  const Wrapped = props => (
    <AsyncContextProvider value={initialCacheStore}>
      <Component {...props} />
    </AsyncContextProvider>
  );

  Wrapped.displayName = 'wrapWithAsyncHydrationData()';

  return Wrapped;
};

export default wrapAsyncTree;
