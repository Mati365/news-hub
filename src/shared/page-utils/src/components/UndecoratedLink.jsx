import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import styled from '@jss';
import isAbsoluteURL from '../helpers/isAbsoluteURL';

export const ConditionalLink = ({to, ...props}) => {
  if (isAbsoluteURL(to)) {
    return (
      <a
        href={to}
        {...props}
      />
    );
  }

  return (
    <Link
      to={to}
      {...props}
    />
  );
};

const UndecoratedLink = styled(
  ConditionalLink,
  {
    base: {
      textTransform: 'initial',
      textDecoration: 'none',
      color: 'inherit',
    },

    hoverable: {
      '&:hover': {
        '&, *': {
          textDecoration: 'underline',
        },
      },
    },
  },
  {
    omitProps: ['hoverable'],
    classSelector: (classes, {hoverable}) => hoverable && classes.hoverable,
  },
);

UndecoratedLink.propTypes = {
  hoverable: PropTypes.bool,
};

UndecoratedLink.defaultProps = {
  hoverable: true,
};

export default UndecoratedLink;
