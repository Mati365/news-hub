import * as R from 'ramda';

import createSchemaLink from './utils/createSchemaLink';

export const CREATE_ARTICLE_URL_SCHEMA = '/article/create';

export default createSchemaLink(
  {
    displayName: 'CreateArticleLink',
    generatorFn: R.always(CREATE_ARTICLE_URL_SCHEMA),
  },
);
