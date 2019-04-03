import PropTypes from 'prop-types';
import styled from '@jss';

const Image = styled.img(
  {
    base: {
      display: 'inline-block',
    },

    expanded: {
      width: '100%',
      height: 'auto',
    },
  },
  {
    omitProps: ['expanded'],
    classSelector: (classes, {expanded}) => expanded && classes[expanded],
  },
);

Image.displayName = 'Image';

Image.propTypes = {
  expanded: PropTypes.bool,
};

Image.defaultProps = {
  expanded: false,
};

export default Image;
