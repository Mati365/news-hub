import PropTypes from 'prop-types';
import styled from '@jss';
import * as R from 'ramda';

import {BREAKPOINTS} from '../styles/createBreakpoints';
import generateNthStyles from './utils/generateNthStyles';

export const MAX_COLUMNS_COUNT = 12;

const pickBreakpointsClasses = (classes, props) => {
  let output = '';

  for (const key in BREAKPOINTS) {
    if (props[key])
      output += `${classes[`${key}-${props[key]}`]} `;
  }

  return output;
};

const generateGridColumnStyles = (classNameFormat, minBreakpointSize, maxColumnsCount) => {
  const singleColumnWidth = 1.0 / maxColumnsCount;
  const breakpointStyle = `@media (min-width: ${minBreakpointSize || 0}px)`;

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
    flexWrap: 'wrap',
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

    'padding-small': {
      padding: 10,
    },

    'padding-medium': {
      padding: 20,
    },

    'padding-big': {
      padding: 30,
    },

    'padding-vertical': {
      paddingLeft: 0,
      paddingRight: 0,

      '&:first-child': {
        paddingTop: 0,
      },

      '&:last-child': {
        paddingBottom: 0,
      },
    },

    'padding-horizontal': {
      paddingTop: 0,
      paddingBottom: 0,

      '&:first-child': {
        paddingLeft: 0,
      },

      '&:last-child': {
        paddingRight: 0,
      },
    },

    ...generateGridColumnStyles('all-%{}', null, MAX_COLUMNS_COUNT),
    ...mapBreakpoints(MAX_COLUMNS_COUNT, BREAKPOINTS),
  },
  {
    omitProps: ['size', 'padding', 'paddingDir', ...R.keys(BREAKPOINTS)],
    classSelector: (classes, props) => [
      props.size && classes[`all-${props.size}`],
      props.padding && classes[`padding-${props.padding}`],
      props.paddingDir && classes[`padding-${props.paddingDir}`],
      pickBreakpointsClasses(classes, props),
    ],
  },
);

Column.displayName = 'Column';

Column.propTypes = {
  size: PropTypes.number,
  padding: PropTypes.string,
  paddingDir: PropTypes.string,
  ...R.mapObjIndexed(R.always(PropTypes.number), BREAKPOINTS),
};

Column.defaultProps = {
  paddingDir: 'horizontal',
};

Grid.Column = Column;

export default Grid;
