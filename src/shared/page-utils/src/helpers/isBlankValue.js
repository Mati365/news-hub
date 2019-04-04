import * as R from 'ramda';

const isBlankValue = R.either(
  R.isNil,
  R.isEmpty,
);

export default isBlankValue;
