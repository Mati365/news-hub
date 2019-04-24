import fs from 'fs';
import jwt from 'jsonwebtoken';

const {
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,

  JWT_PRIVATE_KEY_PATH,
  JWT_PUBLIC_KEY_PATH,
} = process.env;

if (!JWT_PRIVATE_KEY_PATH || !JWT_PUBLIC_KEY_PATH)
  throw new Error('Missing JWT keys! Provide JWT_PRIVATE_KEY_PATH and JWT_PUBLIC_KEY_PATH keys to .env');

const PARSED_KEYS = {
  Secret: (
    JWT_PRIVATE_KEY || fs.readFileSync(JWT_PRIVATE_KEY_PATH)
  ),
  Public: (
    JWT_PUBLIC_KEY || fs.readFileSync(JWT_PUBLIC_KEY_PATH)
  ),
};

export const sign = (data, {expiresIn}) => jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + expiresIn,
    data,
  },
  PARSED_KEYS.Secret,
  {
    algorithm: 'RS256',
  },
);

export const verify = token => jwt.verify(
  token,
  PARSED_KEYS.Public,
  {
    algorithms: 'RS256',
  },
);
