import React from 'react';
import PropTypes from 'prop-types';

import env from '@constants/global/env';
import {
  SSRCookiesProvider,
  useCookies,
} from '@isomorphic-cookies';

import ProvideI18n from '@i18n/components/ProvideI18n';
import MagicJSSHeadTag from '@jss/components/MagicJSSHeadTag';
import {APIProvider} from '@api-client/components';
import {UAProvider} from '@ua';

import HTMLSkeleton from '../components/HTMLSkeleton';
import RouterContent from './RouterContent';
import PageContentContainer from './PageContentContainer';

const JWT_COOKIES_ENV = env.current.cookies.jwt;

const CookieAPIProvider = ({children}) => {
  const cookies = useCookies();

  return (
    <APIProvider
      apiUrl={env.current.apiUrl}
      tokens={{
        // prevent race conditions if user has multiple tabs
        // opened at the same time, read token every requrest
        // yes, it is slow, but works
        tokenGetter: () => cookies.get(JWT_COOKIES_ENV.tokenName),
        refreshTokenGetter: () => cookies.get(JWT_COOKIES_ENV.refreshTokenName),
      }}
      onUpdateTokens={
        ({token, refreshToken}) => {
          cookies.set(
            JWT_COOKIES_ENV.tokenName,
            token.value,
            {
              maxAge: token.maxAge,
            },
          );

          cookies.set(
            JWT_COOKIES_ENV.refreshTokenName,
            refreshToken.value,
            {
              maxAge: refreshToken.maxAge,
            },
          );
        }
      }
    >
      {children}
    </APIProvider>
  );
};

const PageProviders = ({hydrationData, ssrCookiesProps, children}) => {
  const {
    data: {
      i18n,
      ua,
    },
  } = hydrationData;

  return (
    <SSRCookiesProvider {...ssrCookiesProps}>
      <CookieAPIProvider>
        <UAProvider value={ua}>
          <ProvideI18n {...i18n}>
            {children}
          </ProvideI18n>
        </UAProvider>
      </CookieAPIProvider>
    </SSRCookiesProvider>
  );
};

const RootContainer = ({
  head, children, withSkeleton,
  ssrRouterProps,
  ssrCookiesProps,
  hydrationData,
  ...props
}) => {
  const content = (
    <PageProviders
      {...{
        hydrationData,
        ssrCookiesProps,
      }}
    >
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
  ssrCookiesProps: PropTypes.object,
};

RootContainer.defaultProps = {
  withSkeleton: true,
  hydrationData: null,
  ssrRouterProps: null,
  ssrCookiesProps: null,
};

export default RootContainer;
