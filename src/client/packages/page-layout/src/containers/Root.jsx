import React from 'react';

import styled from '@jss';
import MagicJSSHeadTag from '@jss/components/MagicJSSHeadTag';

import HTMLSkeleton from '../components/HTMLSkeleton';

const TestTitle = styled.div(
  {
    fontWeight: 'bold',
  },
);

const RootContainer = ({head, children, ...props}) => (
  <HTMLSkeleton
    {...props}
    head={(
      <>
        <MagicJSSHeadTag />
        {head}
      </>
    )}
  >
    <TestTitle>
      Hello world
    </TestTitle>

    {children}
  </HTMLSkeleton>
);

RootContainer.displayName = 'RootContainer';

export default RootContainer;
