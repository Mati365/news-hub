import PropTypes from 'prop-types';

import styled from '@jss';
import {BUTTON_PRIMARY} from '@constants/colorSchema';

const Button = styled.button(
  {
    base: {
      margin: 0,
      padding: [16, 24],
      outline: 0,
      fontWeight: 600,
      textAlign: 'center',
      borderRadius: 8,
      border: '1px solid',
      background: 'initial',
      cursor: 'pointer',
      textTransform: 'uppercase',
    },

    primary: {
      borderColor: BUTTON_PRIMARY,
      color: BUTTON_PRIMARY,
    },
  },
  {
    omitProps: ['type'],
    classSelector: (classes, {type}) => classes[type],
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  type: PropTypes.oneOf(['primary']),
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;
