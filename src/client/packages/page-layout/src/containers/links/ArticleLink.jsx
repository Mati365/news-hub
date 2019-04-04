import createSchemaLink, {parameterizeKeyPair} from './utils/createSchemaLink';

export const ARTICLE_URL_SCHEMA = '/article/:tag,:id';

export const genArticleURL = article => `/article/${parameterizeKeyPair(article)}`;

export default createSchemaLink(
  {
    displayName: 'ArticleLink',
    itemPropName: 'article',
    generatorFn: genArticleURL,
  },
);
