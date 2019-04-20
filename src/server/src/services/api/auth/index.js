import express from 'express';
import {authJWTGuard} from '../middlewares';

const authRouter = express.Router();

authRouter
  .use(
    authJWTGuard(
      {
        levels: [

        ],
      },
    ),
  );

export default authRouter;
