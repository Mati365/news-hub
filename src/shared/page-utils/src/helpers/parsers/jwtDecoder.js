import * as R from 'ramda';
import {decodeB64} from '../b64';

/**
 * Converts base64 string to javascript object
 *
 * @param {String} str
 */
const parseBase64 = str => JSON.parse(
  decodeB64(
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
