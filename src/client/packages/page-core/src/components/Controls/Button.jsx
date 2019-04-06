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

    danger: {
      borderColor: BUTTON_DANGER,
      color: BUTTON_DANGER,

      '&:hover': {
        background: BUTTON_DANGER,
        color: WHITE,
      },
    },
  },
  {
    omitProps: ['type'],
    classSelector: (classes, {type}) => classes[type],
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  type: PropTypes.oneOf([
    'primary',
    'danger',
  ]),
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;
