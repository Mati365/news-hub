import * as R from 'ramda';

import isDevMode from '@utils/helpers/isDevMode';

/**
 * Dynamic read of manifest data
 *
 * @see
 *  In devleopment value is not cached!
 */
const fetchManifest = (() => {
  const accessor = () => {
    const manifest = __non_webpack_require__('./public/manifest.json'); // eslint-disable-line
    return manifest;
  };

  return (
    isDevMode
      ? accessor
      : R.once(accessor)
  );
})();

const appAssetsManifestMiddleware = (req, res, next) => {
  res.locals.manifest = fetchManifest();
  next();
};

export default appAssetsManifestMiddleware;
