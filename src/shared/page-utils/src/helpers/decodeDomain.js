import * as R from 'ramda';

const decodeDomain = R.compose(
  R.nth(1),
  R.match(/^https?:\/\/([^$/]+)/i),
  R.defaultTo(''),
);

export default decodeDomain;
