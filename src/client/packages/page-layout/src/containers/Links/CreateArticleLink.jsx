import * as R from 'ramda';

import createSchemaLink from './utils/createSchemaLink';

export const CREATE_ARTICLE_URL_SCHEMA = '/create-article';

export default createSchemaLink(
  {
    displayName: 'CreateArticleLink',
    generatorFn: R.always(CREATE_ARTICLE_URL_SCHEMA),
  },
);
