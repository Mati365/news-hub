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

    inline: {
      '& > li': {
        display: 'inline-block',

        '&:first-child': {
          marginLeft: 0,
        },
        '&:last-child': {
          marginRight: 0,
        },
      },
    },
  },
  {
    omitProps: ['inline'],
    classSelector: (classes, {inline}) => inline && classes.inline,
  },
);

UnorderedList.displayName = 'UnorderedList';

UnorderedList.propTypes = {
  inline: PropTypes.bool,
};

UnorderedList.defaultProps = {
  inline: true,
};

export default UnorderedList;
