import {
  useState,
  useCallback,
} from 'react';

import * as R from 'ramda';

const usePromiseState = config => useState(
  {
    result: null,
    error: null,
    success: null,
    loading: false,
    ...config,
  },
);

/**
 * @param {Function} promiseFn
 *
 * @returns Callback with executes promiseFn and sets loading / error flags
 */
const usePromiseCallback = (
  promiseFn,
  {
    silent = false,
    cacheKeys = [],
    rethrow = false,
    afterExecFn = R.F,
    errorSelectorFn,
  },
) => {
  const [promiseState, setPromiseState] = usePromiseState();

  const fn = useCallback(
    async (...args) => {
      try {
        if (!silent) {
          setPromiseState(
            {
              errors: false,
              loading: true,
            },
          );
        }

        const result = await promiseFn(...args);
        const resultErrors = result?.error || result?.errors || null;

        if (!silent) {
          setPromiseState(
            {
              result,
              loading: false,
              ...(
                resultErrors
                  ? {errors: resultErrors, success: false}
                  : {errors: false, success: false}
              ),
            },
          );
        }

        afterExecFn(!!resultErrors, result);
        return result;
      } catch (e) {
        afterExecFn(true, null, e);

        if (!silent) {
          setPromiseState(
            {
              result: null,
              errors: errorSelectorFn?.(e) || true,
            },
          );
        }

        if (rethrow)
          throw e;
      }

      return null;
    },
    cacheKeys,
  );

  return [
    fn,
    promiseState,
  ];
};

export default usePromiseCallback;
