import {
  useState,
  useEffect,
  useMemo,
} from 'react';

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
    () => keyValue || asyncContext.generateUUID(),
    [keyValue],
  );

  const [state, setState] = useState(
    () => {
      if (!allowSSR && ssr) {
        return {
          loading: true,
          data: undefined,
        };
      }

      const cacheData = asyncContext.cache && asyncContext.cache[uuid];
      if (cacheData) {
        return {
          loading: false,
          data: cacheData,
        };
      }

      const {attachPromise} = asyncContext;
      if (ssr && attachPromise) {
        attachPromise(
          uuid,
          promiseFn(),
        );
      }

      return {
        loading: true,
      };
    },
  );

  // ssr already attachedPromise
  useEffect(
    () => {
      if (state.loading)
        return;

      setState(
        {
          loading: true,
          data: undefined,
        },
      );

      promiseFn()
        .then((data) => {
          setState(
            {
              loading: false,
              data,
            },
          );
        });
    },
    [
      state.loading,
      keyValue,
    ],
  );

  return state;
};

export default useAsyncPromise;
