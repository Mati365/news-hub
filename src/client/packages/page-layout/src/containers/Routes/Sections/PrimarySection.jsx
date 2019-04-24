import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {ARTICLE_SCHEMA} from '@constants/typeSchema';

import {useUA} from '@ua';
import {useI18n} from '@i18n';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import {Divider} from '@utils/components';
import ArticleCard from '@client/core/components/Cards/ArticleCard';
import TitledSection from '../../Parts/TitledSection';

import createResponsiveCardsGrid from './utils/createCardsGrid';

const PrimarySectionGrid = createResponsiveCardsGrid(
  {
    md: {
      gridGap: '20px 30px',
      gridTemplateColumns: '3fr 1px 3.5fr 3.5fr',
      gridTemplateRows: 'auto 1px auto',
      gridTemplateAreas: `
        "article-0 vspace article-1 article-2"
        "article-0 vspace hspace  hspace"
        "article-0 vspace article-3  article-4"
      `,
    },
  },
);

const primaryArticleMapper = ua => (article, index) => {
  if (!index) {
    return (
      <ArticleCard
        key={article.id}
        article={article}
        style={{
          gridArea: `article-${index}`,
        }}
        coverType='square'
      />
    );
  }

  const SmallCard = (
    ua.mobile
      ? ArticleCard
      : ArticleCard.Horizontal
  );

  return (
    <SmallCard
      key={article.id}
      article={article}
      style={{
        gridArea: `article-${index}`,
      }}
    />
  );
};

const PrimarySection = ({articles}) => {
  const t = useI18n();
  const ua = useUA();

  if (R.isEmpty(articles))
    return null;

  return (
    <TitledSection
      title={
        t('website.sections.recent.title')
      }
    >
      <PrimarySectionGrid>
        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspace',
          }}
        />

        <Divider
          spacing='none'
          style={{
            gridArea: 'hspace',
          }}
        />

        {articles.map(
          primaryArticleMapper(ua),
        )}
      </PrimarySectionGrid>
    </TitledSection>
  );
};

PrimarySection.displayName = 'PrimarySection';

PrimarySection.propTypes = {
  articles: PropTypes.arrayOf(ARTICLE_SCHEMA),
};

PrimarySection.defaultProps = {
  articles: [],
};

export default React.memo(
  () => (
    <APIQuery
      path='/articles'
      {...loaderComponents}
    >
      {({data: articles}) => (
        <PrimarySection articles={articles} />
      )}
    </APIQuery>
  ),
);
