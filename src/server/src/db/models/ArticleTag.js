import {
  Model,
  QueryBuilder,
} from 'objection';

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

  static get relationMappings() {
    return {
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Tag').default,
        join: {
          from: 'article_tags.tagId',
          to: 'tags.id',
        },
      },
    };
  }

  static QueryBuilder = class extends QueryBuilder {
    $popularTags(sort = 'DESC') {
      return this
        .groupBy('tagId')
        .count('tagId as articlesCount')
        .eager('tag(defaultSelects)')
        .orderBy('articlesCount', sort);
    }
  };
}
