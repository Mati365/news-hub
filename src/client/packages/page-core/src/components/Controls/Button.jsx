import PropTypes from 'prop-types';

import styled from '@jss';
import {
  WHITE,
  BUTTON_SECONDARY,
  BUTTON_PRIMARY,
  BUTTON_DANGER,
} from '@constants/colorSchema';

const Button = styled.button(
  {
    base: {
      margin: 0,
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

    'size-small': {
      padding: [8, 12],
    },

    'size-medium': {
      padding: [16, 24],
    },

    secondary: {
      borderColor: BUTTON_SECONDARY,
      color: BUTTON_SECONDARY,

      '&:hover': {
        background: BUTTON_SECONDARY,
        color: WHITE,
      },
    },

    'filled-secondary': {
      background: BUTTON_SECONDARY,
      color: WHITE,

      '&:hover': {
        background: 'initial',
        borderColor: BUTTON_SECONDARY,
        color: BUTTON_SECONDARY,
      },
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
    omitProps: [
      'color', 'filled', 'disabled',
      'size', 'small',
    ],
    classSelector: (
      classes,
      {
        filled, color,
        size, disabled,
        small,
      },
    ) => [
      classes[`${filled ? 'filled-' : ''}${color}`],
      disabled && classes.disabled,
      small
        ? classes['size-small']
        : (size && classes[`size-${size}`]),
    ],
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  filled: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  small: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'danger',
    'secondary',
  ]),
};

Button.defaultProps = {
  filled: false,
  disabled: false,
  size: 'medium',
  color: 'primary',
};

export default Button;
