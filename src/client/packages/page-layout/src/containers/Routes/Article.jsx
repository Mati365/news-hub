import React from 'react';

import APIQuery from '@api-client/components/APIQuery';
import Article from '@client/core/components/Article';

import {loaderComponents} from '@client/core/components/LoaderAsyncTitles';

import SeeAlsoSection from './Sections/SeeAlsoSection';
import {
  PageHeader,
  PageContainer,
} from '../Parts';

const ArticleRoute = ({match}) => (
  <PageContainer>
    <PageHeader />

    <APIQuery
      path={`article/${match.params.id}`}
      {...loaderComponents}
    >
      {({data: article}) => (
        <Article article={article} />
      )}
    </APIQuery>

    <SeeAlsoSection />
  </PageContainer>
);

ArticleRoute.displayName = 'ArticleRoute';

export default ArticleRoute;
