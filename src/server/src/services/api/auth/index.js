import express from 'express';

import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {User} from '@db/models';

import {REFRESH_TOKEN_MAX_AGE} from '../middlewares/authJWTUserMiddleware';

const authRouter = express.Router();

authRouter
  .post('/refresh-token', wrapAsyncRoute(async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken) {
      res
        .status(400)
        .json(
          {
            error: 'Missing refreshToken body param!',
          },
        );
      return;
    }

    const data = await User.refreshJWT(refreshToken);
    if (!data) {
      res
        .status(401)
        .json(
          {
            error: 'Unauthorized!',
          },
        );
      return;
    }

    res.json(
      {
        token: {
          value: data.token,
          maxAge: data.expiresIn * 1000,
        },

        refreshToken: {
          value: data.refreshToken,
          maxAge: REFRESH_TOKEN_MAX_AGE,
        },
      },
    );
  }));

export default authRouter;
