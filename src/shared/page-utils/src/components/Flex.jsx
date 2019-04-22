import PropTypes from 'prop-types';
import styled from '@jss';

const Flex = styled.div(
  {
    base: {
      display: 'flex',
    },

    expanded: {
      width: '100%',
    },

    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    'direction-row': {flexDirection: 'row'},
    'direction-column': {flexDirection: 'column'},

    'align-center': {alignItems: 'center'},
    'align-flex-start': {alignItems: 'flex-start'},
    'align-flex-end': {alignItems: 'flex-end'},

    'justify-center': {justifyContent: 'center'},
    'justify-flex-start': {justifyContent: 'flex-start'},
    'justify-flex-end': {justifyContent: 'flex-end'},
  },
  {
    omitProps: [
      'direction', 'align', 'expanded',
      'justify', 'centered',
    ],
    classSelector: (
      classes,
      {
        direction, align,
        justify, centered,
        expanded,
      },
    ) => [
      direction && classes[`direction-${direction}`],
      align && classes[`align-${align}`],
      justify && classes[`justify-${justify}`],
      expanded && classes.expanded,
      centered && classes.centered,
    ],
  },
);

Flex.propTypes = {
  expanded: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'column']),
  align: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  justify: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
};

export default Flex;
