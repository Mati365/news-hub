import React from 'react';
import PropTypes from 'prop-types';

import MagicJSSHeadTag from '@jss/components/MagicJSSHeadTag';

import HTMLSkeleton from '../components/HTMLSkeleton';
import RouterContent from './RouterContent';
import PageContentContainer from './PageContentContainer';

const RootContainer = ({
  head, children, withSkeleton,
  ssrRouteMeta,
  ...props
}) => {
  const content = (
    <PageContentContainer>
      <RouterContent ssrRouteMeta={ssrRouteMeta} />
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
  ssrRouteMeta: PropTypes.bool,
};

RootContainer.defaultProps = {
  withSkeleton: true,
  hydrationData: null,
  ssrRouteMeta: null,
};

export default RootContainer;
