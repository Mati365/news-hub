import express from 'express';

const authRouter = express.Router();

authRouter
  .post('/register-guest', (req, res) => {
    res
      .status(200)
      .json(
        {
          token: null,
        },
      );
  });

export default authRouter;
