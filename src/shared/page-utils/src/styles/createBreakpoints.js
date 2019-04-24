import * as R from 'ramda';

import mapKeys from '../helpers/mapKeys';

export const BREAKPOINTS = {
  xs: 0,
  md: 768,
  lg: 992,
  xl: 1366,
  xxl: 1600,
};

const matchBreakpointRange = R.match(/(\w+)(?:-(\w+)|$)/);

const createBreakpoints = mapKeys(
  (key) => {
    const range = matchBreakpointRange(key);
    const minQuery = `@media (min-width: ${BREAKPOINTS[range[1]]}px)`;

    if (range[2])
      return `${minQuery} and (max-width: ${BREAKPOINTS[range[2]]}px)`;

    return minQuery;
  },
);

export default createBreakpoints;
