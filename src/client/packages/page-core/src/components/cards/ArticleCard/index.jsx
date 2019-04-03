import React from 'react';
import PropTypes from 'prop-types';

import {
  Margin,
  Text,
} from '@utils/components';

import ArticleHolder from './ArticleHolder';
import ArticleCover from './ArticleCover';
import ArticleHeader from './ArticleHeader';

const ArticleCard = ({
  article, withCover, headerTag,
  vertical,
}) => (
  <>
    <ArticleHolder vertical={vertical}>
      {withCover && (
        <ArticleCover
          src={article.coverUrl}
          title={article.coverTitle}
        />
      )}

      {/* Todo: Unoredered list */}
      <Margin top={1} bottom={1}>
        <Text.Muted
          size='tiny'
          uppercase
        >
          polityka
        </Text.Muted>
      </Margin>

      <ArticleHeader tag={headerTag}>
        {article.title}
      </ArticleHeader>
    </ArticleHolder>

    <Text align='justify'>
      {article.content}
    </Text>
  </>
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
