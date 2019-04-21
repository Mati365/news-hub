import * as R from 'ramda';

export const decodeUrlParameters = R.compose(
  R.fromPairs,
  R.map(R.split('=')),
  R.split('&'),
);

export const pickURLParameters = R.compose(
  R.ifElse(
    R.isEmpty,
    R.always({}),
    R.compose(
      decodeUrlParameters,
      R.nth(1),
    ),
  ),
  R.match(/\?(.*)$/),
);

export const encodeURLParams = R.compose(
  R.join('&'),
  R.reject(R.isEmpty),
  R.map(
    R.ifElse(
      // if value is empty, return blank
      R.pipe(
        R.nth(1),
        R.complement(R.isNil),
      ),
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value || '')}`,
      R.always(''),
    ),
  ),
  R.toPairs,
);

export const buildURL = (url, params = {}) => {
  if (!params || R.isEmpty(params))
    return url;

  const encoded = encodeURLParams(params);
  if (!encoded.length)
    return url;

  return `${url}?${encoded}`;
};
