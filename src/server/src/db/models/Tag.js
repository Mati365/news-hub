import {Model} from 'objection';

export default class Tag extends Model {
  static tableName = 'tags';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: {
        type: 'number',
      },
      name: {
        type: 'string',
        minLength: 1,
      },
    },
  };
}
