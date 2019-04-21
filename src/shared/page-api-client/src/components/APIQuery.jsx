import {useMemo} from 'react';

import {encodeB64} from '@shared/utils/src/helpers/b64';

import {useAPIContext} from './APIContext';
import useAsyncPromise from '../../../page-async-resolver/src/hooks/useAsyncPromise';

const genQueryKey = ({path, urlParams}) => encodeB64(`${path}/${JSON.stringify(urlParams)}`);

const useAPIQuery = ({responseSelector, ...queryParams}) => {
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
    },
  );
};

const APIQuery = ({children, ...props}) => {
  const apiQuery = useAPIQuery(props);

  return children(apiQuery);
};

APIQuery.displayName = 'APIQuery';

export default APIQuery;
