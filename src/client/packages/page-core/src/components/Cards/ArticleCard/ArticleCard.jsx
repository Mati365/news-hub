import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {ARTICLE_CARD_SCHEMA} from '@constants/typeSchema';

import {truncateEllipsisString} from '@utils/helpers/truncateString';
import provideProps from '@utils/decorators/provideProps';

import {
  ArticleLink,
  SeeMoreLink,
} from '@client/links';

import {
  Margin,
  Text,
} from '@utils/components';

import TagsList from '../../Tags/TagsList';

import ArticleCover from './ArticleCover';
import ArticleHeader from './ArticleHeader';
import ArticleStatsToolbar from './ArticleStatsToolbar';

import ArticleHolder, {
  ArticleContent,
  ArticleToolbar,
  ArticleBookmark,
} from './ArticleHolder';

const ArticleCard = ({
  article, headerTag, bordered,
  vertical, maxDescriptionLength,
  withCover, withTags, withContent,
  linkComponent: LinkComponent,
  ...props
}) => (
  <ArticleHolder
    vertical={vertical}
    bordered={bordered}
    {...props}
  >
    {withCover && (
      <ArticleCover
        article={article}
        vertical={vertical}
      />
    )}

    <div>
      {withTags && article.tags?.length > 0 && (
        <Margin top={1}>
          <TagsList
            tags={
              R.take(6, article.tags)
            }
          />
        </Margin>
      )}

      <LinkComponent article={article}>
        <ArticleHeader tag={headerTag}>
          {article.title}
        </ArticleHeader>
      </LinkComponent>

      {withContent && (
        <ArticleContent>
          {truncateEllipsisString(maxDescriptionLength, article.lead || article.content)}
        </ArticleContent>
      )}

      <ArticleToolbar>
        <Text.Muted>
          <SeeMoreLink
            article={article}
            linkComponent={LinkComponent}
          />
        </Text.Muted>

        <Margin left='auto'>
          <ArticleStatsToolbar article={article} />
        </Margin>
      </ArticleToolbar>

      {withCover && article.bookmarked && (
        <ArticleBookmark
          size='medium'
          left={!vertical}
        />
      )}
    </div>
  </ArticleHolder>
);

ArticleCard.displayName = 'ArticleCard';

ArticleCard.propTypes = {
  article: ARTICLE_CARD_SCHEMA.isRequired,

  linkComponent: PropTypes.any,
  maxDescriptionLength: PropTypes.number,
  headerTag: PropTypes.string,
  vertical: PropTypes.bool, // up-down if true

  withContent: PropTypes.bool,
  withCover: PropTypes.bool,
  withTags: PropTypes.bool,
};

ArticleCard.defaultProps = {
  linkComponent: ArticleLink,

  maxDescriptionLength: 360,
  headerTag: 'H4',
  vertical: true,

  withContent: true,
  withCover: true,
  withTags: true,
};

const MemoizedArticle = React.memo(ArticleCard);

MemoizedArticle.Horizontal = provideProps(
  {
    vertical: false,
    maxDescriptionLength: 250,
  },
)(MemoizedArticle);

export default MemoizedArticle;
