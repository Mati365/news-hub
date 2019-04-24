const path = require('path');

require('dotenv').config();

const {env} = process;

const joinDatabasePath = dbPath => path.resolve(`./src/server/src/db/${dbPath}`);

const ENV_CONFIG = {
  client: env.DB_ADAPTER || 'postgresql',
  connection: env.DATABASE_URL || {
    // if url not provided
    port: env.DB_PORT,
    host: env.DB_HOST,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
  ssl: true,
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
};

module.exports = {
  development: ENV_CONFIG,
  production: ENV_CONFIG,
};
