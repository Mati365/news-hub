import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';
import Text from '@utils/components/Text';

const TextButtonHolder = styled.button(
  {
    background: 'inherit',
    border: 0,
    outline: 0,
    margin: 0,
    padding: 0,
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
);

const TextButton = ({
  wrapped, children, onClick,
  ...props
}) => (
  <TextButtonHolder onClick={onClick}>
    {(
      wrapped
        ? (
          <Text {...props}>
            {children}
          </Text>
        )
        : children
    )}
  </TextButtonHolder>
);

TextButton.displayName = 'TextButton';

TextButton.propTypes = {
  wrapped: PropTypes.bool,
};

TextButton.defaultProps = {
  wrapped: true,
};

export default TextButton;
