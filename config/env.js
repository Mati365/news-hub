module.exports = {
  development: {
    shared: {
      cookies: {
        jwt: {
          tokenName: 'jwt_user_token',
          refreshTokenName: 'jwt_user_refresh_token',
        },
      },
    },

    server: {
      apiUrl: 'http://localhost:3000/api',
    },

    client: {
      apiUrl: '/api',
    },
  },
};
