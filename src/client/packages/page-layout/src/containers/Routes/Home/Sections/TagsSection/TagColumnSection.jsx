import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';
import {TEXT_MUTED} from '@constants/colorSchema';

import {
  ARTICLE_SCHEMA,
  KEY_ITEM_PAIR,
} from '@constants/typeSchema';

import ArticleCard from '@client/core/components/Cards/ArticleCard';
import {Header} from '@utils/components';

const TagTitle = styled(
  Header.H3,
  {
    marginTop: 0,
    color: TEXT_MUTED,
  },
);

const TagColumnSection = ({tag, articles}) => (
  <div>
    <TagTitle>
      {`#${tag.name}`}
    </TagTitle>

    {articles.map(
      article => (
        <ArticleCard.Horizontal
          key={article.id}
          article={article}
          withContent={false}
          withCover={false}
        />
      ),
    )}
  </div>
);

TagColumnSection.displayName = 'TagColumnSection';

TagColumnSection.propTypes = {
  tag: KEY_ITEM_PAIR.isRequired,
  articles: PropTypes.arrayOf(ARTICLE_SCHEMA).isRequired,
};

export default React.memo(TagColumnSection);
