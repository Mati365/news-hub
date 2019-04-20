import {Model} from 'objection';

export default class Article extends Model {
  static tableName = 'articles';

  static jsonSchema = {
    type: 'object',
    required: ['id', 'title', 'content'],

    properties: {
      id: {
        type: 'number',
      },
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
      },
      cover_image: {
        type: 'string',
        format: 'uri',
      },
      content: {
        type: 'string',
        minLength: 1,
      },
    },
  };
}
