import express from 'express';

const apiRouter = express.Router();

apiRouter
  .get('/articles/popular', (req, res) => {
    res
      .json(
        {
          articles: [],
        },
      );
  });

apiRouter
  .get('*', (req, res) => {
    res.json(
      {
        error: 'Not found!',
        status: 404,
      },
    );
  });

export default apiRouter;
