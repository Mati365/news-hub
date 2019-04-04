import {HOME_URL_SCHEMA} from '../links/HomeLink';
import {TAG_URL_SCHEMA} from '../links/TagLink';
import {ARTICLE_URL_SCHEMA} from '../links/ArticleLink';

import HomeRoute from './Home';
import TagRoute from './Tag';
import ArticleRoute from './Article';

export default [
  {
    path: HOME_URL_SCHEMA,
    component: HomeRoute,
    exact: true,
  },

  {
    path: TAG_URL_SCHEMA,
    component: TagRoute,
  },

  {
    path: ARTICLE_URL_SCHEMA,
    component: ArticleRoute,
  },
];
