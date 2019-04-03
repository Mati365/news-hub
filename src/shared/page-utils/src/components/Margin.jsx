import PropTypes from 'prop-types';

import styled from '@jss';
import generateNthStyles from './utils/generateNthStyles';

import format from '../helpers/format';

const MARGIN_LEVELS = 7;
const MARGIN_STEP = 5;

const generateDirectionStyles = (classNameFormat, style, step, levels) => ({
  [format(classNameFormat, ['auto'])]: {
    [style]: 'auto',
  },

  ...generateNthStyles(
    classNameFormat,
    levels,
    index => ({
      [style]: (index + 1) * step,
    }),
  ),
});

const Margin = styled.div(
  {
    base: {
      display: 'inline-block',
    },

    block: {
      display: 'block',
    },

    ...generateDirectionStyles('left-%{}', 'margin-left', MARGIN_STEP, MARGIN_LEVELS),
    ...generateDirectionStyles('right-%{}', 'margin-right', MARGIN_STEP, MARGIN_LEVELS),
    ...generateDirectionStyles('top-%{}', 'margin-top', MARGIN_STEP, MARGIN_LEVELS),
    ...generateDirectionStyles('bottom-%{}', 'margin-bottom', MARGIN_STEP, MARGIN_LEVELS),
  },
  {
    omitProps: [
      'block',
      'top', 'bottom',
      'left', 'right',
    ],
    classSelector: (
      classes,
      {
        block,
        left, right,
        top, bottom,
      },
    ) => [
      block && classes.block,
      left && classes[`left-${left}`],
      right && classes[`right-${right}`],
      top && classes[`top-${top}`],
      bottom && classes[`bottom-${bottom}`],
    ],
  },
);

Margin.displayName = 'Margin';

Margin.propTypes = {
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
};

export default Margin;
