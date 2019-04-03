import PropTypes from 'prop-types';
import styled from '@jss';

const Flex = styled.div(
  {
    base: {
      display: 'flex',
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
    omitProps: ['direction', 'align', 'jusitfy', 'centered'],
    classSelector: (
      classes,
      {
        direction, align,
        justify, centered,
      },
    ) => [
      direction && classes[`direction-${direction}`],
      align && classes[`align-${align}`],
      justify && classes[`justify-${justify}`],
      centered && classes.centered,
    ],
  },
);

Flex.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  align: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  justify: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
};

export default Flex;
