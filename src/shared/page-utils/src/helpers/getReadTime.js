import * as R from 'ramda';

export const MAX_CHARACTERS_PER_MINUTE = 40;

const getReadTime = R.compose(
  Math.ceil,
  R.divide(R.__, MAX_CHARACTERS_PER_MINUTE),
  R.length,
  R.defaultTo(''),
);

export default getReadTime;
