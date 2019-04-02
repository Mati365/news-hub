import * as R from 'ramda';

const FORMAT_REPLACE_REGEX = /%{(\w*)}/g;

/**
 * @param {String} str
 * @param {Any} params
 *
 * @returns {String}
 *
 * @example
 *  format("Dupa %{a} 123", {a: 22})
 *    // => "Dupa 22 123"
 */
const format = (str, params) => {
  let counter = 0;

  return str.replace(
    FORMAT_REPLACE_REGEX,
    (group, match) => {
      if (R.is(String, match) && match.length)
        return params[match];

      return params[counter++];
    },
  );
};

export default format;
