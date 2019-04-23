import {HOME_URL_SCHEMA} from '../Links/HomeLink';
import {TAG_URL_SCHEMA} from '../Links/TagLink';
import {ARTICLE_URL_SCHEMA} from '../Links/ArticleLink';
import {CREATE_ARTICLE_URL_SCHEMA} from '../Links/CreateArticleLink';
import {EDIT_ARTICLE_URL_SCHEMA} from '../Links/EditArticleLink';
import {ARTICLES_URL_SCHEMA} from '../Links/ArticlesLink';

import HomeRoute from './Home';
import TagRoute from './Tag';
import ArticleRoute from './Article';
import CreateArticleRoute from './CreateArticle';
import EditArticle from './EditArticle';
import ArticlesRoute from './Articles';

export default [
  {
    path: HOME_URL_SCHEMA,
    component: HomeRoute,
    exact: true,
  },

  {
    path: ARTICLES_URL_SCHEMA,
    component: ArticlesRoute,
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
    path: EDIT_ARTICLE_URL_SCHEMA,
    component: EditArticle,
    exact: true,
  },

  {
    path: CREATE_ARTICLE_URL_SCHEMA,
    component: CreateArticleRoute,
    exact: true,
  },
];
