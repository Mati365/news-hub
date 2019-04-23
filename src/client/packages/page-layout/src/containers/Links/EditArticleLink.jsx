import createSchemaLink from './utils/createSchemaLink';

export const EDIT_ARTICLE_URL_SCHEMA = '/article/edit/:id';

export const genArticleEditURL = article => `/article/edit/${article.id}`;

export default createSchemaLink(
  {
    displayName: 'EditArticleLink',
    itemPropName: 'article',
    generatorFn: genArticleEditURL,
  },
);
