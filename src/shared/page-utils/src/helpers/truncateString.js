import * as R from 'ramda';

const truncateString = R.curry(
  (truncateCharacters, maxLength, str) => {
    if (str.length < maxLength)
      return str;

    return `${R.slice(0, maxLength, str)}${truncateCharacters}`;
  },
);

export const truncateEllipsisString = truncateString('...');

export default truncateString;
