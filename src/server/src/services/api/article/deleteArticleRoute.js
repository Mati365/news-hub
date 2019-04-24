import wrapAsyncRoute from '@services/shared/decorators/wrapAsyncRoute';
import {Article} from '@db/models';

const deleteArticleRoute = wrapAsyncRoute(async (req, res) => {
  await Article
    .query()
    .deleteById(req.params.id);

  res
    .status(200)
    .json(
      {
        status: 'ok',
      },
    );
});

export default deleteArticleRoute;
