import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';

const RESET_MARGINS_STYLE = {
  margin: 0,
  padding: 0,
};

const UnorderedList = styled.ul(
  {
    base: {
      ...RESET_MARGINS_STYLE,
      '& > li': {
        ...RESET_MARGINS_STYLE,
        listStyleType: 'none',
      },
    },

    flex: {
      display: 'flex',
      alignItems: 'center',
    },

    inline: {
      '& > li': {
        display: 'inline-block',
        margin: [0, 5],

        '&:first-child': {
          marginLeft: 0,
        },
        '&:last-child': {
          marginRight: 0,
        },
      },
    },

    block: {
      '& > li': {
        display: 'block',
        width: '100%',
        margin: [8, 0],

        '&:first-child': {
          marginTop: 0,
        },

        '&:last-child': {
          marginBottom: 0,
        },
      },
    },
  },
  {
    omitProps: ['inline', 'flex'],
    classSelector: (classes, {flex, inline}) => [
      classes[inline ? 'inline' : 'block'],
      flex && classes.flex,
    ],
  },
);

UnorderedList.displayName = 'UnorderedList';

UnorderedList.propTypes = {
  inline: PropTypes.bool,
  flex: PropTypes.bool,
};

UnorderedList.defaultProps = {
  inline: true,
  flex: false,
};

export const WrappedUnorderedList = ({children, ...props}) => (
  <UnorderedList {...props}>
    {React.Children.map(
      children,
      child => (
        <li>
          {child}
        </li>
      ),
    )}
  </UnorderedList>
);

WrappedUnorderedList.displayName = 'WrappedUnorderedList';

export default UnorderedList;
