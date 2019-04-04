import React from 'react';
import PropTypes from 'prop-types';

import {
  Margin,
  Text,
} from '@utils/components';

import ArticleHolder from './ArticleHolder';
import ArticleCover from './ArticleCover';
import ArticleHeader from './ArticleHeader';
import TagsList from '../../Tags/TagsList';

const ArticleCard = ({
  article, withCover, headerTag,
  vertical,
}) => (
  <ArticleHolder vertical={vertical}>
    {withCover && (
      <ArticleCover
        src={article.coverUrl}
        title={article.coverTitle}
      />
    )}

    {article.tags?.length > 0 && (
      <Margin top={1}>
        <TagsList tags={article.tags} />
      </Margin>
    )}

    <ArticleHeader tag={headerTag}>
      {article.title}
    </ArticleHeader>

    <Text align='justify'>
      {article.content}
    </Text>
  </ArticleHolder>
);

ArticleCard.displayName = 'ArticleCard';

ArticleCard.propTypes = {
  headerTag: PropTypes.string,
  withCover: PropTypes.bool,
  vertical: PropTypes.bool, // up-down if true
};

ArticleCard.defaultProps = {
  headerTag: 'H4',
  withCover: true,
  vertical: true,
};

export default React.memo(ArticleCard);
