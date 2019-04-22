import {Model} from 'objection';

export default class Article extends Model {
  static tableName = 'articles';

  static jsonSchema = {
    type: 'object',
    required: ['title', 'lead', 'userId', 'coverUrl'],

    properties: {
      id: {
        type: 'number',
      },
      title: {
        type: 'string',
        minLength: 1,
        maxLength: 500,
      },
      coverTitle: {
        type: 'string',
      },
      coverUrl: {
        type: 'string',
        format: 'uri',
      },
      lead: {
        type: 'string',
        minLength: 1,
      },
      content: {
        type: 'string',
      },
    },
  };

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User').default,
        join: {
          from: 'Article.userId',
          to: 'User.id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./Tag').default,
        join: {
          from: 'articles.id',
          through: {
            from: 'article_tags.article_id',
            to: 'article_tags.tag_id',
          },
          to: 'tags.id',
        },
      },
    };
  }
}
