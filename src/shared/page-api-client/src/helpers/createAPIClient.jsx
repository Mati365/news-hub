import 'isomorphic-fetch';

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
      decoded: jwtDecoder(tokens.token)?.payload,
    },
  };

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
          Authorization: `Bearer ${context.tokens.token}`,
          ...globalHeaders,
          ...headers,
        },
        ...fetchConfig,
        ...body && {
          body: JSON.stringify(body),
        },
      },
    )
      .then(r => r.json())
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
          refreshToken: tokens.refreshToken,
        },
      },
    );

    if (!data || !data.token)
      throw new Error('Incorrect refresh token response!');

    const {
      refreshToken: {
        value: refreshToken,
      },

      token: {
        value: token,
      },
    } = data;

    if (!token)
      throw new Error('Refreshed token is null!');

    context.tokens = {
      decoded: jwtDecoder(token)?.payload,
      token,
      refreshToken,
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
    if (context.tokens?.decoded?.exp * 1000 > Date.now() - MIN_TOKEN_DURATION) {
      if (!tokenRefreshPromise) {
        const {refreshToken} = tokens;
        if (!refreshToken)
          throw new Error('Token already expired but there is no refresh token!');

        tokenRefreshPromise = refreshContextTokens();
      } else
        await tokenRefreshPromise;
    }

    return apiCall(...params);
  };

  return {
    get(params) {
      return verifiedApiCall(
        {
          method: 'GET',
          ...params,
        },
      );
    },

    post(params) {
      return verifiedApiCall(
        {
          method: 'POST',
          ...params,
        },
      );
    },
  };
};

export default createAPIClient;
