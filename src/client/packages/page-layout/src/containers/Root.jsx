import React from 'react';
import PropTypes from 'prop-types';

import MagicJSSHeadTag from '@jss/components/MagicJSSHeadTag';

import HTMLSkeleton from '../components/HTMLSkeleton';
import RouterContent from './RouterContent';
import PageContentContainer from './PageContentContainer';

const RootContainer = ({
  head, children, withSkeleton,
  ssrRouterProps,
  ...props
}) => {
  const content = (
    <PageContentContainer>
      <RouterContent ssrRouterProps={ssrRouterProps} />
      {children}
    </PageContentContainer>
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
  ssrRouterProps: PropTypes.object,
};

RootContainer.defaultProps = {
  withSkeleton: true,
  hydrationData: null,
  ssrRouterProps: null,
};

export default RootContainer;
