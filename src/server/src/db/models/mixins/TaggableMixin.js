import * as R from 'ramda';
import {QueryBuilder} from 'objection';

const findById = R.curry(
  (id, list) => R.find(R.propEq('id', id), list),
);

const getPairsDiff = (oldIds, newIds, pairsNewList) => R.map(
  findById(R.__, pairsNewList),
  R.difference(oldIds, newIds),
);

const getTagsDiff = (oldList, newList) => {
  const oldIds = R.pluck('id', oldList || []);
  const newIds = R.pluck('id', newList || []);

  return {
    removed: getPairsDiff(oldIds, newIds, oldList),
    added: getPairsDiff(newIds, oldIds, newList),
  };
};

const TaggableMixin = ({
  TagModel,
  RelationModel,

  relation: {
    modelIdField,
    tagIdField = 'tagId',
  },
}) => (Model) => {
  class MixinWrapperModel extends Model {
    async $insertTags(tags) {
      for await (const {name: tagName} of tags) {
        let tag = await TagModel
          .query()
          .findOne('name', tagName);

        if (!tag) {
          tag = await TagModel
            .query()
            .insert(
              {
                name: tagName,
              },
            );
        }

        await RelationModel
          .query()
          .insert(
            {
              articleId: this.id,
              tagId: tag.id,
            },
          );
      }

      return this;
    }

    async $removeTags(tags) {
      const ids = R.pluck('id', tags);

      await RelationModel
        .query()
        .delete()
        .where(modelIdField, this.id)
        .whereIn(tagIdField, ids);

      return this;
    }

    async $patchTags(tags) {
      const diff = getTagsDiff(this.tags, tags);

      return Promise.all(
        [
          this.$insertTags(diff.added),
          this.$removeTags(diff.removed),
        ],
      );
    }
  }

  MixinWrapperModel.QueryBuilder = class extends (Model.QueryBuilder || QueryBuilder) {
    $withTags(tags) {
      return this
        .whereExists(
          MixinWrapperModel
            .relatedQuery('tags')
            .where('tags.id', 'in', tags),
        );
    }

    $patchTags(tags) {
      return this
        .eager('tags(defaultSelects)')
        .runAfter(
          async (result) => {
            await result.$patchTags(tags);
            return result;
          },
        );
    }
  };

  return MixinWrapperModel;
};

export default TaggableMixin;
