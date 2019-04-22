import PropTypes from 'prop-types';
import styled from '@jss';

const Float = styled.span(
  {
    base: {
      float: 'left',
    },

    right: {
      float: 'right',
    },
  },
  {
    omitProps: ['right'],
    classSelector: (classes, {right}) => right && classes.right,
  },
);

Float.displayName = 'Float';

Float.propTypes = {
  right: PropTypes.bool,
};

export default Float;
