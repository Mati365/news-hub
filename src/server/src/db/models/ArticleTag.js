import {Model} from 'objection';

export default class ArticleTag extends Model {
  static tableName = 'article_tags';

  static jsonSchema = {
    type: 'object',
    required: ['articleId', 'tagId'],

    properties: {
      id: {
        type: 'number',
      },
      articleId: {
        type: 'number',
      },
      tagId: {
        type: 'number',
      },
    },
  };
}
