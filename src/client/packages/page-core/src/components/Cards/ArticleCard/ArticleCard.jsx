import React from 'react';
import PropTypes from 'prop-types';

import styled from '@jss';

import textEllipsisStyle from '@utils/styles/textEllipsis';
import {truncateEllipsisString} from '@utils/helpers/truncateString';

import BookmarkIcon from '@icons/BookmarkIcon';

import {
  ArticleLink,
  SeeMoreLink,
} from '@client/links';

import {
  Flex,
  Margin,
  Text,
} from '@utils/components';

import TagsList from '../../Tags/TagsList';

import ArticleHolder from './ArticleHolder';
import ArticleCover from './ArticleCover';
import ArticleHeader from './ArticleHeader';
import ArticleStatsToolbar from './ArticleStatsToolbar';

const ArticleContent = styled(
  Text,
  {
    extend: textEllipsisStyle,
    flex: 1,
  },
  {
    align: 'justify',
  },
);

const ArticleToolbar = styled(
  Flex,
  {
    marginTop: 5,
  },
  {
    direction: 'row',
  },
);

const ArticleBookmark = styled(
  BookmarkIcon,
  {
    position: 'absolute',
    right: 5,
    top: 3,
  },
);

const ArticleCard = ({
  article, withCover, headerTag,
  vertical, maxDescriptionLength, ...props
}) => (
  <ArticleHolder
    vertical={vertical}
    {...props}
  >
    {withCover && (
      <ArticleLink article={article}>
        <ArticleCover
          src={article.coverUrl}
          title={article.coverTitle}
        />
      </ArticleLink>
    )}

    {article.tags?.length > 0 && (
      <Margin top={1}>
        <TagsList tags={article.tags} />
      </Margin>
    )}

    <ArticleLink article={article}>
      <ArticleHeader tag={headerTag}>
        {article.title}
      </ArticleHeader>
    </ArticleLink>

    <ArticleContent>
      {truncateEllipsisString(maxDescriptionLength, article.content)}
    </ArticleContent>

    <ArticleToolbar>
      <Text.Muted>
        <SeeMoreLink to='/' />
      </Text.Muted>

      <Margin left='auto'>
        <ArticleStatsToolbar article={article} />
      </Margin>
    </ArticleToolbar>

    {article.bookmarked && (
      <ArticleBookmark size='medium' />
    )}
  </ArticleHolder>
);

ArticleCard.displayName = 'ArticleCard';

ArticleCard.propTypes = {
  maxDescriptionLength: PropTypes.number,
  headerTag: PropTypes.string,
  withCover: PropTypes.bool,
  vertical: PropTypes.bool, // up-down if true
};

ArticleCard.defaultProps = {
  maxDescriptionLength: 490,
  headerTag: 'H4',
  withCover: true,
  vertical: true,
};

export default React.memo(ArticleCard);
