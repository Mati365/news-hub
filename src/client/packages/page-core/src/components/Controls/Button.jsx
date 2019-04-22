import PropTypes from 'prop-types';

import styled from '@jss';
import {
  WHITE,
  BUTTON_PRIMARY,
  BUTTON_DANGER,
} from '@constants/colorSchema';

const Button = styled.button(
  {
    base: {
      margin: 0,
      padding: [16, 24],
      outline: 0,
      fontWeight: 600,
      textAlign: 'center',
      borderRadius: 8,
      border: '1.25px solid',
      background: 'initial',
      cursor: 'pointer',
      textTransform: 'uppercase',

      transition: '250ms ease-in-out',
      transitionProperty: ['background', 'color'],
    },

    primary: {
      borderColor: BUTTON_PRIMARY,
      color: BUTTON_PRIMARY,

      '&:hover': {
        background: BUTTON_PRIMARY,
        color: WHITE,
      },
    },

    'filled-primary': {
      background: BUTTON_PRIMARY,
      color: WHITE,

      '&:hover': {
        background: 'initial',
        borderColor: BUTTON_PRIMARY,
        color: BUTTON_PRIMARY,
      },
    },

    danger: {
      borderColor: BUTTON_DANGER,
      color: BUTTON_DANGER,

      '&:hover': {
        background: BUTTON_DANGER,
        color: WHITE,
      },
    },

    'filled-danger': {
      background: BUTTON_DANGER,
      color: WHITE,

      '&:hover': {
        background: 'initial',
        borderColor: BUTTON_DANGER,
        color: BUTTON_DANGER,
      },
    },

    disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
      cursor: 'default',

      '&:hover': {
        background: 'initial',
        borderColor: 'initial',
        color: 'initial',
      },
    },
  },
  {
    omitProps: ['color', 'filled', 'disabled'],
    classSelector: (classes, {filled, color, disabled}) => [
      classes[`${filled ? 'filled-' : ''}${color}`],
      disabled && classes.disabled,
    ],
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  filled: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'danger',
  ]),
};

Button.defaultProps = {
  filled: false,
  disabled: false,
  color: 'primary',
};

export default Button;
