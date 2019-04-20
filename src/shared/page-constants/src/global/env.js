import ssr from '@shared/utils/src/helpers/ssr';
import hydrationData from './hydrationData';

export default (
  ssr
    ? __non_webpack_require__('../config/env.js')[process.env.NODE_ENV || 'development'] // eslint-disable-line
    : (hydrationData.env || {})
);
