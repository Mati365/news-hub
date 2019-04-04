import createSchemaLink, {parameterizeKeyPair} from './utils/createSchemaLink';

export const TAG_URL_SCHEMA = '/tag/:tag,:id';

export const genTagURL = tag => `/tag/${parameterizeKeyPair(tag)}`;

export default createSchemaLink(
  {
    displayName: 'TagLink',
    itemPropName: 'tag',
    generatorFn: genTagURL,
  },
);
