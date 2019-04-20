const path = require('path');

require('dotenv').config();

const {env} = process;

const joinDatabasePath = dbPath => path.resolve(`./src/server/src/db/${dbPath}`);

module.exports = {
  development: {
    client: env.DB_ADAPTER,
    connection: {
      port: env.DB_PORT,
      host: env.DB_HOST,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
    },
    pool: {
      min: 5,
      max: 10,
    },
    migrations: {
      directory: joinDatabasePath('migrations'),
    },
    seeds: {
      directory: joinDatabasePath('seeds'),
    },
  },
};
