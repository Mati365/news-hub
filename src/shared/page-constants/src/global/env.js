import ssr from '@shared/utils/src/helpers/ssr';
import hydrationData from './hydrationData';

export default (() => {
  if (!ssr) {
    const current = hydrationData.env || {};

    return {
      ...current,
      current,
    };
  }

  const env = __non_webpack_require__('../config/env.js')[process.env.NODE_ENV || 'development']; // eslint-disable-line
  return {
    ...env,
    current: {
      ...env.shared,
      ...env.server,
    },
  };
})();
