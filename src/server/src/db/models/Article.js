import * as R from 'ramda';
import {
  QueryBuilder,
  Model,
} from 'objection';

import getReadTime from '@utils/helpers/getReadTime';
import TaggableMixin from './mixins/TaggableMixin';

export default
@TaggableMixin(
  {
    TagModel: require('./Tag').default,
    RelationModel: require('./ArticleTag').default,
    relation: {
      modelIdField: 'articleId',
      tagIdField: 'tagId',
    },
  },
)
class Article extends Model {
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

      externalMetaDescriptor: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./ExternalWebsiteMetaDescriptor').default,
        join: {
          from: 'articles.id',
          to: 'external_websites_meta_descriptors.id',
        },
      },
    };
  }

  static get virtualAttributes() {
    return ['readTime'];
  }

  get readTime() {
    return getReadTime(this.content || this.lead);
  }

  static QueryBuilder = class extends QueryBuilder {
    $search({phrase, limit}) {
      const lowPhrase = `%${R.toLower(phrase)}%`;

      if (!phrase || phrase.length < 3)
        return [];

      return this
        .whereRaw('LOWER(title) LIKE ? OR LOWER(lead) LIKE ?', [lowPhrase, lowPhrase])
        .limit(limit)
        .orderBy('createdAt', 'ASC');
    }
  };
}
