import PropTypes from 'prop-types';
import styled from '@jss';

import {
  WHITE,
  ACTIVE_INPUT,
  LIGHT_GRAY,
} from '@constants/colorSchema';

export const inputStyles = {
  base: {
    margin: 0,
    padding: [9, 12],
    outline: 0,
    background: WHITE,
    border: `1px solid ${LIGHT_GRAY}`,
    borderRadius: 4,
    fontSize: '0.9rem',
    transition: 'border-color 250ms ease-in-out',

    '&:focus': {
      borderColor: ACTIVE_INPUT,
    },
  },

  small: {
    padding: [4, 8],
  },
};

export const InputBorderedHolder = styled.div(
  {
    extend: inputStyles.base,
    display: 'flex',
    position: 'relative',
    padding: 0,
  },
);

const InputHolder = styled.input(
  inputStyles,
  {
    omitProps: ['small'],
    classSelector: (classes, {small}) => small && classes.small,
  },
);

InputHolder.displayName = 'InputHolder';

InputHolder.propTypes = {
  small: PropTypes.bool,
};

export default InputHolder;
