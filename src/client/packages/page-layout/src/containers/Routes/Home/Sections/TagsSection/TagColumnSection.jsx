import React from 'react';

import styled from '@jss';
import {TEXT_MUTED} from '@constants/colorSchema';

import {KEY_ITEM_PAIR} from '@constants/typeSchema';
import FAKE_ARTICLE from '@client/layout/mocks/articles';

import ArticleCard from '@client/core/components/Cards/ArticleCard';
import {Header} from '@utils/components';

const TagTitle = styled(
  Header.H3,
  {
    marginTop: 0,
    color: TEXT_MUTED,
  },
);

const TagColumnSection = ({tag}) => (
  <div>
    <TagTitle>
      {`#${tag.name}`}
    </TagTitle>

    <ArticleCard.Horizontal
      article={FAKE_ARTICLE[5]}
      withContent={false}
      withCover={false}
    />
    <ArticleCard.Horizontal
      article={FAKE_ARTICLE[2]}
      withContent={false}
      withCover={false}
    />
    <ArticleCard.Horizontal
      article={FAKE_ARTICLE[3]}
      withContent={false}
      withCover={false}
    />
  </div>
);

TagColumnSection.displayName = 'TagColumnSection';

TagColumnSection.propTypes = {
  tag: KEY_ITEM_PAIR.isRequired,
};

export default TagColumnSection;
