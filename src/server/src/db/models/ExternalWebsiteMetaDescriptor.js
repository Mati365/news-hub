import {Model} from 'objection';

export default class ExternalWebsiteMetaDescriptor extends Model {
  static tableName = 'external_websites_meta_descriptors';

  static jsonSchema = {
    type: 'object',
    required: ['websiteUrl'],

    properties: {
      id: {
        type: 'number',
      },
      websiteUrl: {
        type: 'string',
      },
      metaTitle: {
        type: 'string',
      },
      metaDescription: {
        type: 'string',
      },
      metaKeywords: {
        type: 'string',
      },
      ogImage: {
        type: 'string',
      },
    },
  };
}
