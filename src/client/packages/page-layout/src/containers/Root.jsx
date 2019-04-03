import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';
import MagicJSSHeadTag from '@jss/components/MagicJSSHeadTag';

import HTMLSkeleton from '../components/HTMLSkeleton';

const TestTitle = styled.div(
  {
    fontWeight: 'bold',
  },
);

const RootContainer = ({
  head, children, withSkeleton,
  ...props
}) => {
  const content = (
    <>
      <TestTitle>
        Hello world 2
      </TestTitle>

      {children}
    </>
  );

  if (!withSkeleton)
    return content;

  return (
    <HTMLSkeleton
      {...props}
      head={(
        <>
          <MagicJSSHeadTag />
          {head}
        </>
      )}
    >
      {content}
    </HTMLSkeleton>
  );
};

RootContainer.displayName = 'RootContainer';

RootContainer.propTypes = {
  withSkeleton: PropTypes.bool,
  hydrationData: PropTypes.object, // HTMLSkeleton
};

RootContainer.defaultProps = {
  withSkeleton: true,
  hydrationData: null,
};

export default RootContainer;
