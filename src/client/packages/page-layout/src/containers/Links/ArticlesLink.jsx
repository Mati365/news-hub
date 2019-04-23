import * as R from 'ramda';

import createSchemaLink from './utils/createSchemaLink';

export const ARTICLES_URL_SCHEMA = '/articles';

export default createSchemaLink(
  {
    displayName: 'ArticlesLink',
    generatorFn: R.always(ARTICLES_URL_SCHEMA),
    translationPath: 'website.titles.links.see_more',
  },
);
