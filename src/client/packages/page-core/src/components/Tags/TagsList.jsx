import React from 'react';
import PropTypes from 'prop-types';

import {KEY_ITEM_PAIR} from '@constants/typeSchema';

import styled from '@jss';
import TagLink from '@client/links/TagLink';

import {
  Text,
  UnorderedList,
} from '@utils/components';

export const Tag = ({tag}) => (
  <li>
    <TagLink tag={tag}>
      <Text.Muted
        size='tiny'
        uppercase
      >
        {tag.name}
      </Text.Muted>
    </TagLink>
  </li>
);

Tag.displayName = 'Tag';

const TagsListHolder = styled(
  UnorderedList,
  {
    '& > li': {
      '&:not(:last-child):after': {
        content: '""',
        position: 'relative',
        top: 2,
        left: 0,
        margin: [0, 5],
        borderLeft: '1px solid rgba(0, 0, 0, 0.15)',
      },
    },
  },
  {
    index: 3,
    inline: true,
  },
);

const TagsList = ({tags, itemProps, ...props}) => (
  <TagsListHolder {...props}>
    {tags.map(
      tag => (
        <Tag
          key={tag.id}
          tag={tag}
          {...itemProps}
        />
      ),
    )}
  </TagsListHolder>
);

TagsList.propTypes = {
  tags: PropTypes.arrayOf(KEY_ITEM_PAIR),
  itemProps: PropTypes.object,
};

TagsList.defaultProps = {
  tags: [],
  itemProps: null,
};

export default React.memo(TagsList);
