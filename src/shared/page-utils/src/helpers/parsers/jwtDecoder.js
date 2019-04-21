import * as R from 'ramda';

const decodeBase64 = str => (
  typeof atob === 'undefined'
    ? Buffer.from(str, 'base64').toString('binary')
    : atob(str)
);

/**
 * Converts base64 string to javascript object
 *
 * @param {String} str
 */
const parseBase64 = str => JSON.parse(
  decodeBase64(
    R.compose(
      R.replace('_', '/'),
      R.replace('-', '+'),
      R.defaultTo(''),
    )(str),
  ),
);

export default R.tryCatch(
  R.unless(
    R.isNil,
    R.compose(
      R.zipObj(['header', 'payload']),
      R.map(parseBase64),
      R.init,
      R.split('.'),
    ),
  ),
  R.always(null),
);
