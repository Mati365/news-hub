import express from 'express';
// import {Article} from '@db/models';

const articlesRouter = express.Router();

articlesRouter
  .get('/', (req, res) => {
    res
      .status(200)
      .json(
        {
          articles: [
            {id: 1, name: 'AAA'},
          ],
        },
      );
  });

export default articlesRouter;
