import * as R from 'ramda';

const isAbsoluteURL = R.ifElse(
  R.isNil,
  R.always(false),
  R.test(/^https?:\/\//),
);

export default isAbsoluteURL;
