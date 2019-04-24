import * as R from 'ramda';

const mapKeys = (fn, obj) => R.reduce(
  (acc, currentKey) => {
    acc[fn(currentKey)] = obj[currentKey];
    return acc;
  },
  {},
  R.keys(obj),
);

export default R.curry(mapKeys);
