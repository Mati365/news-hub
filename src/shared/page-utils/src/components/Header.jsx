import PropTypes from 'prop-types';
import * as R from 'ramda';

import styled from '@jss';
import provideProps from '../decorators/provideProps';

const HEADER_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5'];

const Header = styled.div(
  {
    base: {
      marginBottom: '.5em',
      fontFamily: 'inherit',
      fontWeight: 500,
      lineHeight: 1.2,
      color: 'inherit',
    },

    H1: {fontSize: '2.0em'},
    H2: {fontSize: '1.75em'},
    H3: {fontSize: '1.5em'},
    H4: {fontSize: '1.3em'},
    H5: {fontSize: '1.2em'},
  },
  {
    omitProps: ['tag'],
    classSelector: (classes, {tag}) => classes[tag],
  },
);

Header.displayName = 'Header';

Header.propTypes = {
  tag: PropTypes.oneOf(HEADER_TAGS).isRequired,
};

R.forEach(
  (tag) => {
    Header[tag] = provideProps(
      {
        tag,
      },
    )(Header);
  },
  HEADER_TAGS,
);

export default Header;
