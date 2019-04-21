import React from 'react';
import PropTypes from 'prop-types';

import env from '@constants/global/env';

import ProvideI18n from '@i18n/components/ProvideI18n';
import MagicJSSHeadTag from '@jss/components/MagicJSSHeadTag';
import {APIProvider} from '@api-client/components';

import HTMLSkeleton from '../components/HTMLSkeleton';
import RouterContent from './RouterContent';
import PageContentContainer from './PageContentContainer';

const PageProviders = ({hydrationData, children}) => {
  const {
    data: {
      i18n,
    },
  } = hydrationData;

  return (
    <APIProvider
      apiUrl={env.current.apiUrl}
      tokens={{}}
    >
      <ProvideI18n {...i18n}>
        {children}
      </ProvideI18n>
    </APIProvider>
  );
};

const RootContainer = ({
  head, children, withSkeleton,
  ssrRouterProps,
  hydrationData,
  ...props
}) => {
  const content = (
    <PageProviders hydrationData={hydrationData}>
      <PageContentContainer>
        <RouterContent ssrRouterProps={ssrRouterProps} />
        {children}
      </PageContentContainer>
    </PageProviders>
  );

  if (!withSkeleton)
    return content;

  return (
    <HTMLSkeleton
      {...props}
      hydrationData={hydrationData}
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
  hydrationData: PropTypes.shape(
    {
      scripts: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.shape(
        {
          i18n: PropTypes.shape(
            {
              lang: PropTypes.string,
              pack: PropTypes.object,
            },
          ),
        },
      ),
    },
  ),
  ssrRouterProps: PropTypes.object,
};

RootContainer.defaultProps = {
  withSkeleton: true,
  hydrationData: null,
  ssrRouterProps: null,
};

export default RootContainer;
