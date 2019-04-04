import * as R from 'ramda';

import createSchemaLink from './utils/createSchemaLink';

export const HOME_URL_SCHEMA = '/';

export default createSchemaLink(
  {
    displayName: 'HomeLink',
    generatorFn: R.always(HOME_URL_SCHEMA),
  },
);
