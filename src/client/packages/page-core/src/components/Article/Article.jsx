import React from 'react';

import {ARTICLE_SCHEMA} from '@constants/typeSchema';

import styled from '@jss';

import {ArticleLink} from '@client/links';
import {
  Divider,
  Grid,
  Margin,
} from '@utils/components';

import TagsList from '../Tags/TagsList';

import ArticleCover from '../Cards/ArticleCard/ArticleCover';
import ArticleHeader from '../Cards/ArticleCard/ArticleHeader';
import ArticleStatsToolbar from '../Cards/ArticleCard/ArticleStatsToolbar';

import ArticleHolder, {
  ArticleContent,
  ArticleToolbar,
  ArticleBookmark,
} from '../Cards/ArticleCard/ArticleHolder';

import ArticleActionToolbar from './ArticleActionToolbar';

const ArticleFullContent = styled(
  ArticleContent,
  {
    fontSize: '1.05rem',
  },
);

const Article = ({article, ...props}) => (
  <ArticleHolder
    vertical
    {...props}
  >
    <ArticleCover
      article={article}
      vertical
    />

    <Grid>
      <Grid.Column xs={12} md={2} lg={1}>
        <ArticleActionToolbar />
      </Grid.Column>

      <Grid.Column xs={12} md={10} lg={11}>
        {article.tags?.length > 0 && (
          <Margin top={1}>
            <TagsList tags={article.tags} />
          </Margin>
        )}

        <ArticleLink article={article}>
          <ArticleHeader tag='H1'>
            {article.title}
          </ArticleHeader>
        </ArticleLink>

        <Divider />

        <ArticleFullContent>
          {article.content}
        </ArticleFullContent>

        <ArticleToolbar>
          <Margin left='auto'>
            <ArticleStatsToolbar article={article} />
          </Margin>
        </ArticleToolbar>

        {article.bookmarked && (
          <ArticleBookmark size='medium' />
        )}
      </Grid.Column>
    </Grid>
  </ArticleHolder>
);

Article.displayName = 'ArticleCard';

Article.propTypes = {
  article: ARTICLE_SCHEMA.isRequired,
};

export default Article;
