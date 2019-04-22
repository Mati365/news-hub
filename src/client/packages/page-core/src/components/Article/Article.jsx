import React from 'react';
import PropTypes from 'prop-types';

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

const Article = ({article, withActionToolbar, ...props}) => {
  const content = (
    <>
      {article.tags?.length > 0 && (
        <Margin
          top={1}
          bottom={2}
        >
          <TagsList tags={article.tags} />
        </Margin>
      )}

      <ArticleLink article={article}>
        <ArticleHeader tag='H1'>
          {article.title}
        </ArticleHeader>
      </ArticleLink>

      <Divider />

      <ArticleFullContent
        dangerouslySetInnerHTML={{
          __html: article.content || article.lead,
        }}
      />

      <ArticleToolbar>
        <Margin left='auto'>
          <ArticleStatsToolbar article={article} />
        </Margin>
      </ArticleToolbar>

      {article.bookmarked && (
        <ArticleBookmark size='medium' />
      )}
    </>
  );

  return (
    <ArticleHolder
      vertical
      {...props}
    >
      <ArticleCover
        article={article}
        vertical
      />

      {(
        withActionToolbar
          ? (
            <Grid>
              <Grid.Column xs={12} md={2} lg={1}>
                <ArticleActionToolbar />
              </Grid.Column>

              <Grid.Column xs={12} md={10} lg={11}>
                {content}
              </Grid.Column>
            </Grid>
          )
          : content
      )}
    </ArticleHolder>
  );
};

Article.displayName = 'ArticleCard';

Article.propTypes = {
  article: ARTICLE_SCHEMA.isRequired,
  withActionToolbar: PropTypes.bool,
};

Article.defaultProps = {
  withActionToolbar: true,
};

export default Article;
