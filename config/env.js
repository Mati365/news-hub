module.exports = {
  development: {
    shared: {
      cookies: {
        jwt: {
          token_name: 'jwt_user_token',
          refresh_token_name: 'jwt_user_refresh_token',
        },
      },
    },

    server: {},
    client: {},
  },
};
