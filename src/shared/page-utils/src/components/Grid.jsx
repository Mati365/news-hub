import PropTypes from 'prop-types';
import styled from '@jss';
import * as R from 'ramda';

import generateNthStyles from './utils/generateNthStyles';

export const MAX_COLUMNS_COUNT = 12;
export const BREAKPOINTS = {
  xs: 576,
  md: 768,
  lg: 992,
  xl: 1366,
  xxl: 1600,
};

const pickBreakpointsClasses = (classes, props) => {
  let output = '';

  for (const key in BREAKPOINTS) {
    if (props[key])
      output += classes[`${key}-${props[key]}`];
  }

  return output;
};

const generateGridColumnStyles = (classNameFormat, minBreakpointSize, maxColumnsCount) => {
  const singleColumnWidth = 1.0 / maxColumnsCount;
  const breakpointStyle = `@media (min-width: ${minBreakpointSize}px)`;

  return generateNthStyles(
    classNameFormat,
    maxColumnsCount,
    (index) => {
      const percentage = `${((index + 1) * singleColumnWidth * 100).toFixed(5)}%`;

      return {
        [breakpointStyle]: {
          maxWidth: percentage,
          flex: [0, 0, percentage],
        },
      };
    },
  );
};

const mapBreakpoints = (maxColumnsCount, breakpoints) => R.compose(
  R.mergeAll,
  R.values,
  R.mapObjIndexed(
    (minSize, key) => generateGridColumnStyles(`${key}-%{}`, minSize, maxColumnsCount),
  ),
)(breakpoints);

/**
 * @export
 * @component
 */
const Grid = styled.div(
  {
    display: 'flex',
  },
);

Grid.displayName = 'Grid';

/**
 * @exports
 * @component
 */
const Column = styled.div(
  {
    base: {
      maxWidth: '100%',
      flexBasis: 0,
      flexGrow: 1,
    },

    ...generateGridColumnStyles('all-%{}', null, MAX_COLUMNS_COUNT),
    ...mapBreakpoints(MAX_COLUMNS_COUNT, BREAKPOINTS),
  },
  {
    omitProps: ['size', ...R.keys(BREAKPOINTS)],
    classSelector: (classes, props) => [
      props.size && classes[`all-${props.size}`],
      pickBreakpointsClasses(classes, props),
    ],
  },
);

Column.displayName = 'Column';

Column.propTypes = {
  size: PropTypes.number,
  ...R.mapObjIndexed(R.always(PropTypes.number), BREAKPOINTS),
};

Grid.Column = Column;

export default Grid;
