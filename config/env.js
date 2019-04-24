const SHARED_CONF = {
  shared: {
    cookies: {
      jwt: {
        tokenName: 'jwt_user_token',
        refreshTokenName: 'jwt_user_refresh_token',
      },
    },
  },

  server: {
    apiUrl: `http://localhost:${process.env.PORT || process.env.APP_PORT || 3000}/api`,
  },

  client: {
    apiUrl: '/api',
  },
};

module.exports = {
  development: SHARED_CONF,
  production: SHARED_CONF,
};
