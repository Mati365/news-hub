import ssr from '@shared/utils/src/helpers/ssr';
import {buildURL} from '@utils/helpers/parsers/urlEncoder';
import jwtDecoder from '@utils/helpers/parsers/jwtDecoder';

const MIN_TOKEN_DURATION = 15000;

const createAPIClient = (
  {
    apiUrl,
    headers: globalHeaders,
    tokens,
    onUpdateTokens,
  },
) => {
  let tokenRefreshPromise = null;
  const context = {
    tokens: {
      ...tokens,
      decoded: jwtDecoder(tokens.tokenGetter())?.payload,
    },
  };

  if (!ssr && process.env.NODE_ENV === 'development')
    console.log(context.tokens?.decoded?.data);

  /**
   * Creates single apiCall, does not verify if token is OK
   *
   * @param {Object} config
   */
  const apiCall = ({
    method, headers,
    path, urlParams,
    body,
    ...fetchConfig
  }) => (
    fetch(
      buildURL(`${apiUrl}/${path}`, urlParams),
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${context.tokens.tokenGetter()}`,
          ...globalHeaders,
          ...headers,
        },
        ...fetchConfig,
        ...body && {
          body: JSON.stringify(body),
        },
      },
    )
      .then((r) => {
        if (r.status >= 400 && r.status < 600)
          throw new Error('Bad response from server');

        return r.json();
      })
  );

  /**
   * Fetches new tokens and assigns them to context
   */
  const refreshContextTokens = async () => {
    const data = await apiCall(
      {
        method: 'POST',
        path: 'auth/refresh-token',
        body: {
          refreshToken: tokens.refreshTokenGetter(),
        },
      },
    );

    if (!data || !data.token)
      throw new Error('Incorrect refresh token response!');

    const {
      token: {
        value: token,
      },
    } = data;

    if (!token)
      throw new Error('Refreshed token is null!');

    context.tokens = {
      ...context.tokens,
      decoded: jwtDecoder(token)?.payload,
    };

    // save cookie etc
    if (onUpdateTokens)
      onUpdateTokens(data);
  };

  /**
   * Checks if token expired, if not - call, if yes - refetch
   *
   * @param  {...any} params
   */
  const verifiedApiCall = async (...params) => {
    if (new Date(context.tokens?.decoded?.exp * 1000) < Date.now() + MIN_TOKEN_DURATION) {
      if (!tokenRefreshPromise) {
        const {refreshTokenGetter} = tokens;
        if (!refreshTokenGetter)
          throw new Error('Token already expired but there is no refresh token!');

        tokenRefreshPromise = refreshContextTokens();
      }

      await tokenRefreshPromise;
    }

    return apiCall(...params);
  };

  const bindMethodCaller = method => params => verifiedApiCall(
    {
      method,
      ...params,
    },
  );

  return {
    verifiedApiCall,
    get: bindMethodCaller('GET'),
    post: bindMethodCaller('POST'),
    patch: bindMethodCaller('PATCH'),
    put: bindMethodCaller('PUT'),
  };
};

export default createAPIClient;
