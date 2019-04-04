import PropTypes from 'prop-types';

import styled from '@jss';

const Divider = styled(
  'hr',
  {
    base: {
      padding: 0,
      border: 0,
      outline: 0,
    },

    none: {
      margin: 0,
    },

    big: {
      margin: 25,
    },

    horizontal: {
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    },

    vertical: {
      width: 1,
      height: '100%',
      marginTop: 0,
      marginBottom: 0,
      borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
    },
  },
  {
    omitProps: ['vertical', 'spacing'],
    classSelector: (classes, {vertical, spacing}) => [
      classes[spacing],
      classes[vertical ? 'vertical' : 'horizontal'],
    ],
  },
);

Divider.displayName = 'Divider';

Divider.propTypes = {
  vertical: PropTypes.bool,
  spacing: PropTypes.oneOf([
    'none',
    'big',
  ]),
};

Divider.defaultProps = {
  vertical: false,
  spacing: 'big',
};

export default Divider;
