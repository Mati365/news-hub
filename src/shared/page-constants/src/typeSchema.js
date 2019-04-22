import PropTypes from 'prop-types';
import * as R from 'ramda';

import * as DIRECTIONS from './directions';

export const ID_SCHEMA = PropTypes.oneOfType(
  [
    PropTypes.number,
    PropTypes.string,
  ],
);

export const KEY_ITEM_PAIR = PropTypes.shape(
  {
    id: ID_SCHEMA,
    name: PropTypes.string,
  },
);

const ARTICLE_CARD_FIELDS = {
  id: ID_SCHEMA,
  coverUrl: PropTypes.string,
  coverTitle: PropTypes.string,
  title: PropTypes.string,
  lead: PropTypes.string,
  tags: PropTypes.arrayOf(KEY_ITEM_PAIR),
  commentsCount: PropTypes.number,
  readTime: PropTypes.number,
  bookmarked: PropTypes.bool,
};

export const ARTICLE_CARD_SCHEMA = PropTypes.shape(ARTICLE_CARD_FIELDS);

export const ARTICLE_SCHEMA = PropTypes.shape(
  {
    ...ARTICLE_CARD_FIELDS,
    content: PropTypes.string,
  },
);

export const DIRECTION_SCHEMA = PropTypes.oneOf(
  R.values(DIRECTIONS),
);
