import * as R from 'ramda';
import {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import ssr from '@shared/utils/src/helpers/ssr';
import {useAsyncPromisesContext} from '../AsyncContextProvider';

const responseSelect = (fn, data) => {
  if (!fn)
    return data;

  if (R.is(String, fn))
    return data[fn];

  return fn(data);
};

const useAsyncPromise = (
  {
    allowSSR = true,
    keyValue = null,
    responseSelector,
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
          data: responseSelect(responseSelector, cacheData),
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
  const prevKey = useRef(keyValue);
  useEffect(
    () => {
      if ((state.loading && !state.data) || prevKey.current !== keyValue) {
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
                data: responseSelect(responseSelector, data),
              },
            );
          });
      }

      prevKey.current = keyValue;
    },
    [
      state.loading,
      keyValue,
    ],
  );

  return state;
};

export default useAsyncPromise;
