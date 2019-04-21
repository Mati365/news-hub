import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {encodeB64} from '@shared/utils/src/helpers/b64';

import {useAPIContext} from './APIContext';
import useAsyncPromise from '../../../page-async-resolver/src/hooks/useAsyncPromise';

const genQueryKey = ({path, urlParams}) => encodeB64(`${path}/${JSON.stringify(urlParams)}`);

const useAPIQuery = ({responseSelector, skipIf, ...queryParams}) => {
  const client = useAPIContext();
  const key = useMemo(
    () => genQueryKey(queryParams),
    [
      queryParams.path,
      queryParams.urlParams,
    ],
  );

  return useAsyncPromise(
    {
      promiseFn: () => client.get(queryParams),
      keyValue: key,
      responseSelector,
      skipIf,
    },
  );
};

const APIQuery = ({
  children,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent,
  ...props
}) => {
  const apiQuery = useAPIQuery(props);

  if (apiQuery.loading && LoadingComponent)
    return <LoadingComponent />;

  if (apiQuery.error && ErrorComponent)
    return <ErrorComponent />;

  return children(apiQuery);
};

APIQuery.displayName = 'APIQuery';

APIQuery.propTypes = {
  errorComponent: PropTypes.any,
  loadingComponent: PropTypes.any,
};

export default APIQuery;
