import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';

import Text from './Text';
import Margin from './Margin';

const IconTextHolder = styled(
  Text,
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
);

const IconText = ({icon, text, ...props}) => (
  <IconTextHolder {...props}>
    {icon}
    <Margin left={1}>
      {text}
    </Margin>
  </IconTextHolder>
);

IconText.displayName = 'IconText';

IconText.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.node,
};

IconText.defaultProps = {
  icon: null,
  text: null,
};

export default IconText;
