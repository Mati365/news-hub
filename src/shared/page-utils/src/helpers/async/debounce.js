import * as R from 'ramda';

const debounce = R.curry(
  ({delay, initialInstant = true}, fn) => {
    let timer = null;
    let firstCall = false;

    return (...args) => {
      if (!firstCall) {
        firstCall = true;
        if (initialInstant) {
          fn(...args);
          return;
        }
      }

      if (!R.isNil(timer))
        clearTimeout(timer);

      timer = setTimeout(
        () => fn(...args),
        delay,
      );
    };
  },
);

export default debounce;
