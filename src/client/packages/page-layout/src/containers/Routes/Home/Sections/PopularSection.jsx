import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {ARTICLE_SCHEMA} from '@constants/typeSchema';

import {useI18n} from '@i18n';
import styled from '@jss';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import {Divider} from '@utils/components';
import ArticleCard from '@client/core/components/Cards/ArticleCard';
import TitledSection from '../../../Parts/TitledSection';


const PopularSectionGrid = styled.div(
  {
    display: 'grid',
    gridGap: '20px 30px',
    gridTemplateColumns: '3.3fr 1px 3.3fr 1px 3.3fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      "big vspace bigB vspaceB bigC"
    `,
  },
);

const PopularSection = ({articles}) => {
  const t = useI18n();

  if (R.isEmpty(articles))
    return null;

  return (
    <TitledSection
      title={
        t('website.sections.articles.title')
      }
    >
      <PopularSectionGrid>
        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspace',
          }}
        />

        <Divider
          spacing='none'
          vertical
          style={{
            gridArea: 'vspaceB',
          }}
        />

        {articles[0] && (
          <ArticleCard
            article={articles[0]}
            style={{
              gridArea: 'big',
            }}
          />
        )}

        {articles[1] && (
          <ArticleCard
            article={articles[1]}
            style={{
              gridArea: 'bigB',
            }}
          />
        )}

        {articles[2] && (
          <ArticleCard
            article={articles[2]}
            style={{
              gridArea: 'bigC',
            }}
          />
        )}
      </PopularSectionGrid>
    </TitledSection>
  );
};

PopularSection.displayName = 'PopularSection';

PopularSection.propTypes = {
  articles: PropTypes.arrayOf(ARTICLE_SCHEMA),
};

PopularSection.defaultProps = {
  articles: [],
};

export default React.memo(
  () => (
    <APIQuery
      path='/articles'
      urlParams={{
        sortBy: 'popularity',
      }}
      {...loaderComponents}
    >
      {({data: articles}) => (
        <PopularSection articles={articles} />
      )}
    </APIQuery>
  ),
);
