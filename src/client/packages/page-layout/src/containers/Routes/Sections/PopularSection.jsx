import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import {ARTICLE_SCHEMA} from '@constants/typeSchema';

import {useI18n} from '@i18n';

import APIQuery from '@api-client/components/APIQuery';
import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import TitledSection from '../../Parts/TitledSection';
import {
  ChunkedGrid,
  ThreeArticlesCardsRow,
} from './Shared';

const PopularSection = ({articles, children}) => {
  const t = useI18n();

  if (R.isEmpty(articles))
    return null;

  return (
    <TitledSection
      title={
        t('website.sections.articles.title')
      }
    >
      <ChunkedGrid
        rowComponent={ThreeArticlesCardsRow}
        list={articles}
        every={3}
      />

      {children}
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
  ({limit = 6, ...props}) => (
    <APIQuery
      path='/articles'
      urlParams={{
        sortBy: 'popularity',
        limit,
      }}
      {...loaderComponents}
    >
      {({data: articles}) => (
        <PopularSection
          articles={articles}
          {...props}
        />
      )}
    </APIQuery>
  ),
);
