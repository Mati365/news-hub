import {useMemo} from 'react';

import ssr from '@shared/utils/src/helpers/ssr';
import {useAsyncPromisesContext} from '../AsyncContextProvider';

const useAsyncPromise = (
  {
    allowSSR = true,
    keyValue = null,
    promiseFn,
  },
) => {
  const asyncContext = useAsyncPromisesContext();
  const uuid = useMemo(
    asyncContext.generateUUID,
    [keyValue],
  );

  if (!allowSSR && ssr)
    return;

  const cacheData = asyncContext.cache && asyncContext.cache[uuid];
  asyncContext.attachPromise(uuid, promiseFn());

  console.log(cacheData);
};

export default useAsyncPromise;
