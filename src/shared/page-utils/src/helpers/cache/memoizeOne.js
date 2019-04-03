import shallowCompareArrays from '../comparators/shallowCompareArrays';

export const memoizeOneCall = cacheFn => (fn) => {
  let prevArgs = null;
  let prevResult = null;

  return (...args) => {
    if (prevArgs && cacheFn(prevArgs, args))
      return prevResult;

    prevArgs = args;
    prevResult = fn(...args);

    return prevResult;
  };
};

export default memoizeOneCall(shallowCompareArrays);
