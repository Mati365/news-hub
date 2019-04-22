import env from '@constants/global/env';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {User} from '@db/models';

const {
  tokenName: JWT_COOKIE_NAME,
  refreshTokenName: JWT_REFRESH_COOKIE_NAME,
} = env.shared.cookies.jwt;

export const REFRESH_TOKEN_MAX_AGE = 315360000000;

export const getLocalUserInfo = res => res.locals.userMeta?.info;

/**
 * Saves authorized JWT keys
 *
 * @param {*} res
 * @param {Object} jwtData
 * @param {Boolean} assignCookies
 */
const storeJWT = async (req, res, jwtData, assignCookies = true) => {
  if (!jwtData)
    return false;

  const {
    expiresIn,
    token,
    refreshToken,
    payload,
  } = jwtData;

  res.locals.userMeta = {
    info: payload,
    keys: {
      token,
      refreshToken,
    },
  };

  if (assignCookies) {
    req.cookies[JWT_COOKIE_NAME] = token;
    res.cookie(
      JWT_COOKIE_NAME,
      token,
      {
        maxAge: expiresIn * 1000,
      },
    );

    req.cookies[JWT_REFRESH_COOKIE_NAME] = refreshToken;
    res.cookie(
      JWT_REFRESH_COOKIE_NAME,
      refreshToken,
      {
        maxAge: REFRESH_TOKEN_MAX_AGE,
      },
    );
  }

  return true;
};

/**
 * Create new user and assign cookies and other stuff to locals
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createAnonymousUserMiddleware = async (req, res, next) => {
  const user = await User.insertAnonymousUser();

  await storeJWT(
    req,
    res,
    await user.signJWT(),
  );
  next();
};

/**
 * Decode user token, if not present - create new
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authJWTUserMiddleware = async (req, res, next) => {
  const {
    [JWT_COOKIE_NAME]: token,
    [JWT_REFRESH_COOKIE_NAME]: refreshToken,
  } = req.cookies;

  // token should be fine
  if (token) {
    const decrypted = await User.decryptJWT(token);

    if (decrypted) {
      await storeJWT(
        req,
        res,
        {
          payload: decrypted,
          token,
          refreshToken,
        },
        // do not update cookies
        false,
      );
    }
  }

  // try to refresh token
  if (refreshToken && !res.locals.userMeta?.info) {
    await storeJWT(
      req,
      res,
      await User.refreshJWT(refreshToken),
    );
  }

  // register new user
  if (!res.locals.userMeta?.info)
    createAnonymousUserMiddleware(req, res, next);
  else
    next();
};

export default wrapAsyncRoute(authJWTUserMiddleware);
