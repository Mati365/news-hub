import {HOME_URL_SCHEMA} from '../Links/HomeLink';
import {TAG_URL_SCHEMA} from '../Links/TagLink';
import {ARTICLE_URL_SCHEMA} from '../Links/ArticleLink';
import {CREATE_ARTICLE_URL_SCHEMA} from '../Links/CreateArticleLink';

import HomeRoute from './Home';
import TagRoute from './Tag';
import ArticleRoute from './Article';
import CreateArticleRoute from './CreateArticle';

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

  {
    path: CREATE_ARTICLE_URL_SCHEMA,
    component: CreateArticleRoute,
    exact: true,
  },
];
